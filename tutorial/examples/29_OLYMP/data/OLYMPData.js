
// %%include%%: "../../18_BasicClasses/reference.js"

// This file provides classes which allow access to different OLYMP
// data. Each class provides access to one or more types of data.
// Each type of data can either be fetched from the persistence server
// or from a local file.
//
// In addition to providing access to the raw data, these classes sometimes
// also provide initial processing for the data (such as, for example,
// creating the list of dimension types or providing various translation
// tables).

var classes = {

    // This class should be defined close to the root of the application
    // and provides information for all databases used by the application.
    // Speicifically, the application is required to define the following
    // (see explanation in the class definition below).
    //
    // 

    OLYMPDataContext: {

        context: {
            // this is the path from the directory in which the application
            // was defined to the main data directory
            pathToData: mustBeDefined,

            // this is where labels, fields and colors are specified
            "^colorGold": "#fc0",
            "^colorSilver": "#1f78b4",
            "^colorBronze": "#a6cde2",
            totalLabel: "total",
            labeledFieldsColors: o(
                { label: "Bronze", field: "Planned_Total_Amount_Notional", color: [{ colorBronze: _ }, [me]] },
                { label: "Silver", field: "Planned_EU_amount", color: [{ colorSilver: _ }, [me]] },
                { label: "Gold", field: "Total_Eligible_Costs_selected_Fin_Data", color: [{ colorGold: _ }, [me]] }
            )

        }
    },

    // Base class for various OLYMP databases. This is inherited by every
    // specific class for providing a specific database (one area per
    // database). For each database, the inheriting class must provide
    // the following context labels:
    //
    // dataFileName: the name of the local file from which the data
    //     can be read (this is mainly for local testing). This file
    //     path should be relative to the directory pointed at by
    //     [{ pathToData: _ }, [myContext, "OLYMPData"]],
    // databaseName: the name of the database on the persistence server.

    OLYMPDatabase: o({

        context: {
            // should the DB on the remote server be used (set to false
            // to use a local copy of the data)
            useDB: [arg, "useDB", true],
            dataFileName: mustBeDefined,
            databaseName: mustBeDefined,

            // true when the top level of the database has been completely
            // loaded
            allDataLoaded: [notEmpty, [{ dataTable: _ }, [me]]],
        }
    },{
        qualifier: { useDB: true },
        
        context: {
            databaseID: [{ id: _, name: [{ databaseName: _ }, [me]] }, [databases]],
            dataTable: [database, [{ databaseID: _}, [me]]],
            dataAttributes: [{ attributes: _, id: [{ databaseID: _}, [me]] }, [databases]]
        }
    }, {
        // fetch data from local file
        qualifier: { useDB: false },

        context: {
            fileName: [
                concatStr,
                o([{ pathToData: _ }, [myContext, "OLYMPData"]],
                  [{ dataFileName: _ }, [me]])
            ],
            dataTable: [{ data: _ }, [datatable, [{ fileName: _ }, [me]]]],
            dataAttributes: [{ attributes: _ }, [datatable, [{ fileName: _ }, [me]]]]
        }
    }),


    //
    // OLYMP Categorised planned vs. implemented database
    //

    OLYMPCategorisationData: o({

        "class": "OLYMPDatabase",

        context: {
            //dataFileName: "/ESIF/ESIF_2014-2020_categorisation_ERDF-ESF-CF_planned_vs_implemented.csv",
            //databaseName: "plannedvsimplemented",

            // path to relevant data file under the 'pathToData'.
            dataFileName: "/OlympicMedals/summer.csv", // see also winter.csv dictionary.csv
            databaseName: "olympicsmedals",

            // input data for selection chains
            inputData: [{ dataTable: _ }, [me]],

            // the dimension types available in the data
            dimensionTypes: [_, [{ Dimension_Type: _ },
            [{ inputData: _ }, [me]]]],
            // all facets currently available in the database
            allDataFacetNames: [{ name: _ },
                                [{ dataAttributes: _ }, [me]]],
            
            // each dimension type defines a virtual facet, but they
            // all look at the same facet in the database. We here therefore
            // define a translation table to translate each dimension type
            // to the facet "Dimension_title".
            dimensionFacetTranslation: o(
                [
                    map,
                    [defun, "type",
                        { userFacet: "type", dataFacet: "Dimension_title" }],
                    [n("InterventionField"), [{ dimensionTypes: _ }, [me]]]
                ],
                { userFacet: "InterventionField", dataFacet: "Dimension_code" }
            )
        }

    }),

    OLYMPCCIData: o({

        "class": "OLYMPDatabase",

        context: {
            // path to relevant data file under the 'pathToData'.
            dataFileName: "/OLYMP/cci_lookup_table.json",
            databaseName: "ccilookup",

            ccis: [{ data: _ }, [{ cciTable: _ }, [me]]]
        }
    }),

    // This class provides access to the table mapping each intervention
    // field to the cross-cutting themes it belongs to. In addition, this
    // table stores the climate and biodiversity weighting for each
    // intevention field. For more information, see OLYMPCrossCuttingThemes.js.

    OLYMPCrossCuttingThemeData: o({

        "class": "OLYMPDatabase",

        context: {
            // path to relevant data file under the 'pathToData'.
            dataFileName: "/OLYMP/OLYMP_2014-2020_Categorisation_Crosscutting_Themes_Lookup.csv",
            databaseName: "crosscuttingThemeLookup",

            // The full data, including both the categorization information
            // and the weighting information
            categorizationWithWeights: [{ dataTable: _ }, [me]],

            // the categorization with weights also contains lines for
            // climate and biodeiversity weighting, which are removed
            // here, since they do nto have a numeric code
            categorization: [
                {
                    Cross_cutting_theme_code: r(-Infinity, Infinity),
                },
                [{ categorizationWithWeights: _ }, [me]]],
        }
    }),

    // Table specifying shorter display names for (some) cross cutting themes.

    OLYMPCrossCuttingThemeDisplayData: o({

        "class": "OLYMPDatabase",

        context: {
            // path to relevant data file under the 'pathToData'.
            dataFileName: "/OLYMP/OLYMP_2014-2020_Categorisation_Crosscutting_Themes_Display.csv",
            databaseName: "crosscuttingThemeDisplay",

            // translation from the original theme names in the database
            // to the displayed theme names. Themes which do not appear
            // in this table do not require any translation.
            themeTranslation: [{ dataTable: _ }, [me]]
        }
    })
};

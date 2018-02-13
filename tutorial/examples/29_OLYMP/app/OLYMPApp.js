
// %%classfile%%: "../../18_BasicClasses/screenArea.js"
// %%classfile%%: "../../18_BasicClasses/generator.js"
// %%classfile%%: "../data/OLYMPData.js"
// %%classfile%%: "../crossCuttingThemes/OLYMPCrossCuttingThemes.js"
// %%classfile%%: "../selectionChain/OLYMPSelectorSearch.js"
// %%classfile%%: "../selectionChain/OLYMPSelectors.js"
// %%classfile%%: "../selectionChain/OLYMPValueTranslation.js"
// %%classfile%%: "OLYMPLayouts.js"
// %%classfile%%: "OLYMPViews.js"
// %%classfile%%: "OLYMPSlices.js"

var classes = {

    // top level area for this application. Stores all the global
    // areas created for this application.
    
    AppContext: {
        context: {          
            inTheMiddleOfAnimation: [{ inTheMiddleOfAnimation: _ }, [areaOfClass, "OLYMPSingleViewSliceEditorLayout"]],
            // scale options:
            simplifiedScale: [{ inTheMiddleOfAnimation: _ }, [me]], // when true tickmarks are disabled (except for min and max)
            // multibars options:
            showMultibarValues: true, //[not, [{ inTheMiddleOfAnimation: _ }, [me]]],
            // Fonts (currently used by multibar and legend)
            fontFamily: '"Open Sans",Roboto,sans-serif',
            fontWeight: 300,
            defaultTextColor: "#111111",     
            facetSelectorList: o("Year", "City", "Sport", "Discipline", "Athlete", "Country", "Gender", "Event"), //"Medal"
            restrictedSelectors: o("Year", "Gender", "Country"), //"Medal" //[{ restrictedSelectors: _ }, [myContext, "App"]],
        }
    },

    OLYMPApp: o(
        {
            // various global classes required at the root of the application
            "class": o("AppContext", "OLYMPDataContext", "NextIdContext",
                       "OLYMPValueTranslation"),

            context: {
                pathToData: "../../../../data/",
            },
            
            children: {
                categorisationData: { description: {
                    "class": "OLYMPCategorisationData"
                }},

                layouts: { description: {
                    "class": "OLYMPSingleViewLayout",
                    context: {
                        // initially, the default view is the active view
                        "^activeView": o({ id: 0 })
                    },
                    position: {
                        // xxxxxxxxxxxxxxxx
                        frame: 0 
                    }
                }},

                // area to manage all slices in the application
                sliceManager: { description: {
                    "class": "OLYMPSliceManager"
                }},

                // area to manage all views in teh application
                viewManager: { description: {
                    "class": "OLYMPViewManager",
                    context: {
                        // initialize with a single view (ID before the first
                        // ID assigned by the global 'nextId').
                        "^views": o({ id: 0 })
                    }
                }},

                // intervention field manager and menu (constructed once,
                // globally)
        
                themeManager: {
                    description: {
                        "class": "OLYMPCrossCuttingThemeManager"
                    }
                },
                internventionFieldThemeMenu:  {
                    description: {
                        "class": "OLYMPSearchThemeMatrix"
                    }
                }
            }
        }
    )
};

var screenArea = {
    "class": o("ScreenArea", "OLYMPApp"),
};

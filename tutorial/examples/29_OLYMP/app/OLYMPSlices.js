
// %%classfile%%: "../../18_BasicClasses/generator.js"
// %%classfile%%: "../../19_selectionChain/selectionChain.js"

var classes = {

    // This class is responsible for managing the list of slices available.
    // It is a derived class of the "ObjectManager" class. This means
    // that it supports the following interface for adding and deleting
    // a slice:
    //
    // Send a message to this area in order to add or delete a slice.
    // Slice IDs are allocated from the global ID pool.
    // To add a slice send the message:
    // {
    //     message: "Add",
    //     recipient: <the OLYMPSliceManager area>
    // }
    // To delete a slice, send the message:
    // {
    //     message: "Delete",
    //     id: <ID of this slice>,
    //     recipient: <the OLYMPSliceManager area>
    // }
    //
    
    OLYMPSliceManager: o({

        "class": o("ObjectManager", "SelectionChainContext"),
        
        context: {
            // list of all slices in the application. This stores the ID of
            // the slice together with some descriptive information about the
            // slice. The definition of the slice itself is currently stored
            // in the OLYMPSlice areas which are the children of the
            // OLYMPSliceManager
            "^sliceIds": o({ id: 0 }), // initialize with a single slice
            uniqueObjects: [{ sliceIds: _ }, [me]],

            // the last slice added is only used once the following slice is
            // added (to make sure the slice is added quickly).
            nextSliceId: [{ id: _ }, [last, [{ sliceIds: _ }, [me]]]],

            // the slice areas
            slices: [{ children: { slices: _ }}, [me]],

            //
            // selection chain context
            //
            
            inputData: [{ inputData: _ },
                        [areaOfClass, "OLYMPCategorisationData"]],

            // each dimension type defines a virtual facet, but they
            // all look at the same facet in the database. We here therefore
            // define a translation table to translate each dimension type
            // to the facet "Dimension_title".
            facetTranslations: o(
                [{ dimensionFacetTranslation: _ },
                 [areaOfClass,"OLYMPCategorisationData"]]
            ),

            // List of possible values in a facet, per facet.
            
        },

        // slice areas
        
        children: {
            slices: {
                data: [{ sliceIds: _ }, [me]],
                description: {
                    "class": "OLYMPSlice"
                }
            },

            // common data for all slices
            
            // common selection chain for generating values common to all
            // slices, such as the list of values available in a facet.
            commonSelectionChain: { description: {
                "class": "TopLevelSelectionChain"
            }},

            // areas to generate the possible list of values per facet
            // (excluding the dimension facet).
            allValuesPerFacet: {
                data: [{ facetSelectorList: _ }, [myContext, "App"]],
                description: {
                    context: {
                        selectionChain: [
                            { children: { commonSelectionChain: _ }},
                            [embedding]],
                        facetName: [{ param: { areaSetContent: _ }}, [me]],
                        allValues: [
                            _,
                            [[{ projectOnFacet: _ },
                              [{ selectionChain: _ }, [me]]],
                             [{ facetName: _ }, [me]],
                             [{ inputData: _ },
                              [{ selectionChain: _ }, [me]]]]],
                    }
                }
            }
        },
    }),
    
    // This class represents a single slice. Currently, the selections
    // associated with each slice are stored inside it.

    OLYMPSlice: o({

        context: {
            // the unique ID of this slice
            id: [{ id: _ }, [{ param: { areaSetContent: _ }}, [me]]],
            dimensionTypeSelectionChain: [
                { children: { dimensionTypeSelectionChain: _ }}, [me]],
            selectionChain: [{ children: { selectionChain: _ }}, [me]],

            selectedDimensionType: [
                { facetName: "Dimension_Type", selected: true,
                  value: _
                },
                [{ selectedValues: _}, 
                 [{ children: { dimensionTypeSelectionChain: _ }}, [me]]]],
        },
        
        children: {
            /*dimensionTypeSelectionChain: { description: {
                "class": "TopLevelSelectionChain",
                context: {
                    // initial selected dimension type
                    "^selectedValues": o({
                        facetName: "Dimension_Type",
                        value: "InterventionField",
                        selected: true
                    }),
                }
            }},*/
            selectionChain: { description: {
                "class": "TopLevelSelectionChain",
                context: {
                    /*inputData: [
                        { solutionSet: _ },
                        [{ children: { dimensionTypeSelectionChain: _ }},
                         [embedding]]],*/
                    // only facets which are in the input data or are
                    // the currently selected dimension facet are active
                    activeFacetNames: o(
                        [{ allDataFacetNames: _ },
                         [areaOfClass, "OLYMPCategorisationData"]],
                        [{ selectedDimensionType: _ }, [embedding]]),
                }
            }}
        }
    }),
};

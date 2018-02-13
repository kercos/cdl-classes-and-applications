
var initGlobalDefaults = {
    scrollableSelectorItemSize: 30,
};

// %%classfile%%: "../../19_selectionChain/selector.js"
// %%classfile%%: "../../18_BasicClasses/wrap.js"
// %%classfile%%: "../../18_BasicClasses/matrixLayout.js"
// %%classfile%%: "../../18_BasicClasses/draggable.js"
// %%classfile%%: "../../18_BasicClasses/screenArea.js"
// %%classfile%%: "../crossCuttingThemes/OLYMPCrossCuttingThemes.js"
// %%classfile%%: "../data/OLYMPData.js"
// %%classfile%%: "../app/OLYMPSlices.js"
// %%classfile%%: "OLYMPSelectorSearch.js"
// %%classfile%%: "OLYMPValueTranslation.js"

var classes = {
    
    // This area implements a single slice editor, which takes a slice
    // a creates a set of selectors for it.
    
    OLYMPSliceEditor: o(
        { 
            context: {
                // this is the OLYMPSlice area which defines the slice being
                // edited here.
                slice: mustBeDefined,
            },
            children: {
                /*rightFacetSelectorPane: { description: {
                    "class": "OLYMPSidePanelDimensionSelector",
                    context: {
                        initialWidth: 300,
                    }
                }},*/
                rightFacetSelectorPane: { description: {
                    "class": "OLYMPFacetSelectorSidePanel",
                }},
                leftFacetSelectorPane: { description: {
                    "class": "OLYMPFacetSelectorSidePanel",
                }}
            }
        }
    ),
    
    // The context class for the embedded selectors. It is assumed that
    // that it is embedded* inside a slice editor and has access o the
    // slice through the slice editor.
    // This class may either embed* the relevant selector or be part of the
    // selector (to allow each selector to have a different context).
    
    OLYMPSelectorContext: o(
        {
            "class": o("FacetSelectorContext"),
            context: {
                selectionChain: [
                    { selectionChain: _ }, [{ slice: _ },
                                            [my, "OLYMPSliceEditor"]]],
                selectedDimensionType: [
                    { selectedDimensionType: _}, [{ slice: _ },
                                                  [my, "OLYMPSliceEditor"]]],
                
                // translation table for facet names

                facetTitleTranslation: o(
                    {facetName: "Year", title: "Year"},
                    {facetName: "City", title: "City"},
                    {facetName: "Sport", title: "Sport"},
                    {facetName: "Discipline", title: "Discipline"},
                    {facetName: "Athlete", title: "Athlete"},
                    {facetName: "Country", title: "Country"},
                    {facetName: "Gender", title: "Gender"},
                    {facetName: "Event", title: "Event"}
                    //{facetName: "Medal", title: "Medal"}
                )
            }
        }
    ),    

    // This class defines various selector design properties. This should
    // be placed in an area which embeds all facet selectors (each selector
    // may later decide which values to use out of this object).
    
    OLYMPSelectorDesignContext: o(
        {
            context: {
                selectorTitlePalette: {
                    background: "#004494",
                    textColor: "#f0f0f0",
                    toggleMenuButtonHoverColor: "#0060b0",
                    toggleMenuTriangleColor: "#e0e0e0",
                    notSelectedMenuItem: {
                        background: "#006aba",
                        borderColor: "#003080",
                        mouseOverBackground: "#0062b2",
                        textColor: "#d0d0d0",
                    },
                    selectedMenuItem: {
                        background: "#008ada",
                        borderColor: "#002070",
                        mouseOverBackground: "#0082d2",
                        textColor: "#e0e0e0",
                    }
                },
                
                /*selectorTitlePalette: {
                    background: "#00a7a7",
                    textColor: "#000000",
                    toggleMenuTriangleColor: "#000000",
                    toggleMenuButtonHoverColor: "#00b3b3",
                    menuItemPrimaryColor: "#00b0b0",
                    menuItemTextColor: "#404040",
                    menuItemPrimaryBorderColor: "#009090",
                    menuItemSelectedColor: "#00d0d0",
                    menuItemSelectedTextColor: "#404040",
                    menuItemSelectedBorderColor: "#008080"
                    },*/
                selectorBackground: "#d0e0f0",
                searchBackground: "#c8d8e8",
                searchBorderColor: "#808080",
                selectorScrollbarCursorColor: "#a0a0a0",
            }
        }
    ),
    
    OLYMPFacetSelectors: o(
        {
            "class": o("OLYMPSelectorContext"),

            children: {
                selectors: {
                    // hard-coded list of facet names, for now
                    data: [{ restrictedSelectors: _ }, [myContext, "App"]], //o("Year", "Country", "Gender", "Event"), //o("Year", "City", "Sport", "Discipline", "Athlete", "Country", "Gender", "Event", "Medal"),
                    description: {
                        "class": "OLYMPSelectorWithTitle",
                        context: {
                            initialWidth: 300,
                            initialLeft: 0,
                            initialTop: 0
                        },
                    }
                }
            }
        }
    ),

    // Use this class to create a side panel (left or right depending on the
    // value of "panelSide") which contains all teh facets which define
    // the allocated category.
    
    OLYMPFacetSelectorSidePanel: o(
        {
            "class": o("OLYMPSelectorContext"),
            
            context: {
                // left or right
                panelSide: [{ facetSelectorPanelSide: _ },
                            [my, "OLYMPSliceEditor"]],

                // define the initial width of the panel (enough to have
                // 5 country items side by side).
                initialWidth: 368,
            },

            position: {
                top: 0,
                bottom: 0,
                firstChildAtTop: {
                    point1: { type: "top" },
                    point2: {
                        type: "top",
                        element: [first,
                                  [{ children: { selectors: _ }}, [me]]]
                    },
                    equals: 0,
                },
                lastChildAtBottom: {
                    point1: {
                        type: "bottom",
                        element: [last,
                                  [{ children: { selectors: _ }}, [me]]]
                    },
                    point2: { type: "bottom" },
                    equals: 0
                }
            },
            
            children: {
                selectors: {
                    // hard-coded list of facet names, for now
                    data: [{ restrictedSelectors: _ }, [myContext, "App"]], //o("Year", "City", "Sport", "Discipline"), //o("Year", "City", "Sport", "Discipline", "Athlete", "Country", "Gender", "Event", "Medal"),
                    description: {
                        "class": "OLYMPSelectorWithTitle",
                        position: {
                            left: 0,
                            right: 0,
                            // each selector under the previous one
                            underPrev: {
                                point1: {
                                    type: "bottom", element: [prev, [me]] },
                                point2: { type: "top" },
                                equals: 2
                            }
                        }  
                    }
                }
            }
        },

        {
            qualifier: { panelSide: "right" },

            "class": o("DraggableEdgeLeft"),

            context: {
                draggableEdgeLeftIsResize: true
            },

            position: {
                right: 0
            }
        },
        
        {
            qualifier: { panelSide: "left" },

            "class": o("DraggableEdgeRight"),

            context: {
                draggableEdgeRightIsResize: true
            },

            position: {
                left: 0
            },

            // adjust the response area of the drag handle so that it does not
            // cover the scrollbar.

            children: { rightDragHandle: { description: {
                context: {
                    responseWidth: 10,
                    responseCenterHorizontalOffset: 4
                }
            }}}
        }
    ),
    
    //
    // Base classes for the OLYMP selector.
    //

    OLYMPSelector: o(
        {
            context: {
                // the selector name (for which this selector is constructed)
                // is often also the facte name, but the dimension title
                // facet is dynamic, serving different facet names.
                selectorName: [{ param: { areaSetContent: _ }}, [me]],
                facetName: [{ selectorName: _ }, [me]],
                // take the (possibly translated) facet name as the title
                title: [
                    first,
                    o([{ facetName: [{ facetName: _ }, [me]],
                         title: _ },
                       [{ facetTitleTranslation: _ },
                        [myContext,"FacetSelector"]]],
                      [{ facetName: _ }, [me]])],

                // function to translate values of selectors to the
                // values which should be displayed for them.
                getDisplayName: [{ facetName: _ }, [me]]
                /* leave translation for later xxxx
                [
                    { getDisplayName: _ , facetName: [{ facetName: _ }, [me]] },
                    [{ displayNameTranslation: _ },
                     [my, "OLYMPValueTranslation"]]
                ]*/
            },
        },
    ),

    // selector class with a title area and (optionally) a search area.
    // facets: "Year", "City", "Sport", "Discipline", "Athlete", "Country", "Gender", "Event", "Medal"
    OLYMPSelectorWithTitle: o(
        {
            "class": o("OLYMPSelectorDesign", "OLYMPSelector"),

            context: {
                isFirst: [empty, [prev, [me]]],
            },

            children: {
                title: { description: {
                    "class": o("OLYMPSelectorTitle"),
                }},
            }
        },
        
        {
            qualifier: { selectorName: o("Year", "Gender") },
            "class": "OLYMPMatrixSelector",
        },

        {
            qualifier: { selectorName: o("City", "Sport", "Country", "Discipline", "Athlete", "Event") },
            "class": o("OLYMPScrollableSelector"),
            
        }
    ),

    // Use this class if the selector should be draggable
    // One still needs to set the initial position of the area. See the
    // documentation of "DraggableInContainer" for this.
    
    OLYMPDraggableSelectorWithTitle: o(
        {
            "class": o("OLYMPSelectorWithTitle", "DraggableInContainer"),

            context: {
                // for dragging around the container
                dragContainer: [my, "OLYMPSliceEditor"],
                dragInContainerHandle: [{ children: { dragHandle: _ }}, [me]],
                // define here the initial offset and width
                // initialWidth: ?
                // initialLeft: ?
                // initialRight: ?
                // initialTop: ?
            },

            children: {
                title: { description: {
                    "class": o("DraggableEdgeRight"),
                    context: {
                        draggableEdgeRightIsResize: true,
                        initialWidth: [{ initialWidth: _ }, [embedding]]
                    }
                }},
                dragHandle: { description: {
                    "class": o("OLYMPSelectorTitleDragHandle"),
                }}
            }
        }
    ),

    // Drag handle for the selector which covers the title
    
    OLYMPSelectorTitleDragHandle: o(
        {
            "class": "DraggableInContainerHandle",

            position: {
                // the drag handle covers the title 
                leftAlignWithTitle: {
                    point1: { type: "left" },
                    point2: { type: "left",
                              element: [
                                  { children: { title: _ }}, [embedding]] },
                    equals: 0
                },
                rightAlignWithTitle: {
                    point1: { type: "right" },
                    point2: { type: "right",
                              element: [
                                  { children: { title: _ }}, [embedding]] },
                    equals: 0
                },
                topAlignWithTitle: {
                    point1: { type: "top" },
                    point2: { type: "top",
                              element: [
                                  { children: { title: _ }}, [embedding]] },
                    equals: 0
                },
                bottomAlignWithTitle: {
                    point1: { type: "bottom" },
                    point2: { type: "bottom",
                              element: [
                                  { children: { title: _ }}, [embedding]] },
                    equals: 0
                }
            }
        }
    ),
        
    OLYMPSelectorDesign: o(
        {
            // wrap the children (default margin is 0)
            "class": o("WrapChildren", "OLYMPSelectorItemContext"),

            display: {
                background: [{ selectorBackground: _ },
                             [myContext, "OLYMPSelectorDesign"]]
            },
        }
    ),

    // Context class for the selector items. Is used to specify colors and
    // other properties. Some defaults are already defined here.
    
    OLYMPSelectorItemContext: {
        context: {
            itemFontFamily: "sans-serif",
            // For each of the following cases, define some or all of the
            // following properties
            // background,
            // borderColor,
            // (borderWidth is not specified here, as different item
            // classes display different borders).
            // mouseOverBackground,
            // fontSize,
            // textColor,
            // fontWeight
            itemSelectedAvailableDesign: {
                background: "#a8b8d0", // "#c0d0e0",
                borderColor: "#8090a0",
                mouseOverBackground: "#a0b0c8", 
                textColor: "#303030",
                fontWeight: 300
            },
            itemSelectedNotAvailableDesign: {
                background: "#c8c8c8",
                borderColor: "#b0b0b0", // "#909090",
                mouseOverBackground: "#c0c0c0", 
                textColor: "#909090",
                fontWeight: 300
            },
            itemNotSelectedAvailableDesign: {
                background: "#c0d0e0",
                borderColor: "#c0d0e0", // "#a8b8c8", // "#909090",
                mouseOverBackground: "#b8c8d8", 
                textColor: "#404040",
                fontWeight: 300
            },
            itemNotSelectedNotAvailableDesign: {
                background: "#d0d0d0",
                borderColor: "#d0d0d0", // "#c0d0e0", // "#a8b8c8", // "#909090",
                mouseOverBackground: "#c8c8c8", 
                textColor: "#a8a8a8",
                fontWeight: 300
            },
        },
    },

    // Single selector item base class (shared by scrolled and matrix
    // selectors).
    
    OLYMPSelectorItem: o(
        {
            context: {
                getDisplayName: [{ getDisplayName: _ }, [my, "OLYMPSelector"]],
                pointerInArea: [{ param: { pointerInArea: _ }}, [me]]
            },
            display: {
                background: [{ background: _ }, [{ displayProps: _ },[me]]],
                borderStyle: "solid",
                borderColor: [{ borderColor: _ }, [{ displayProps: _ },[me]]],
                text: {
                    fontFamily: [
                        { itemFontFamily: _ }, [myContext, "OLYMPSelectorItem"]],
                    fontSize: 12,
                    color: [{ textColor: _ }, [{ displayProps: _ },[me]]],
                    fontWeight: [{ fontWeight: _ }, [{ displayProps: _ },[me]]],
                    value: [{ content: _ }, [me]]
                }
            }
        },

        {
            qualifier: { pointerInArea: true },

            display: {
                background: [
                    { mouseOverBackground: _}, [{ displayProps: _ },[me]]],
            }
        },
        
        // wth this uncommented the text would not be visible somehow
        /*{
            qualifier: { getDisplayName: true },

            display: {
                text: {
                    value: [
                        [{ getDisplayName: _ }, [me]], [{ content: _ }, [me]]
                    ]
                }
            }
        },*/

        {
            qualifier: { isInImplicitSolutionSet: false },

            context: {
                isClickable: false                               
            }
        },
        
        {
            qualifier: { isSelected: false, isInImplicitSolutionSet: true },

            context: {
                displayProps: [{ itemNotSelectedAvailableDesign: _ },
                               [myContext, "OLYMPSelectorItem"]],
                               
            },
        },

        {
            qualifier: { isSelected: false, isInImplicitSolutionSet: false },

            context: {
                displayProps: [{ itemNotSelectedNotAvailableDesign: _ },
                               [myContext, "OLYMPSelectorItem"]],
                               
            }
        },

        {
            qualifier: { isSelected: true, isInImplicitSolutionSet: true },

            context: {
                displayProps: [{ itemSelectedAvailableDesign: _ },
                               [myContext, "OLYMPSelectorItem"]],
                               
            }
        },

        {
            qualifier: { isSelected: true, isInImplicitSolutionSet: false },

            context: {
                displayProps: [{ itemSelectedNotAvailableDesign: _ },
                               [myContext, "OLYMPSelectorItem"]],
                               
            }
        }
    ),

    // This class defines the list of 'allValues' for this selector to
    // be (if available) the list from the slice manager (rather than the
    // list from the selection chain of the specific slice) 
    
    OLYMPSelectorAllValues: o(
        {
            context: {
                // area storing the list of all values, if available.
                allValuesForFacet: [
                    { allValues: _ },
                    [{ facetName: [{ facetName: _ }, [me]] },
                     [{ children: { allValuesPerFacet: _ }},
                      [areaOfClass, "OLYMPSliceManager"]]]],
            }
        },
        {
            qualifier: { allValuesForFacet:  true },
            context: {
                allValues: [{ allValuesForFacet: _ }, [me]],
            }
        }
    ),
    
    //
    // Scrollable selector
    //
    
    OLYMPScrollableSelector: o(
        {
            "class": o("OLYMPScrollableSelectorDesign"),
            
            children: {
                selector: { description: {
                    "class": o("OLYMPSelectorAllValues",
                               { name: "ScrollableSelector",
                                 itemClass: "OLYMPScrollableSelectorItem" }),
                    context: {
                        facetName: [{ facetName: _ }, [embedding]],
                        isRadioSelector: [{ isRadioSelector: _ }, [embedding]]
                    }
                }}
            }
        }
    ),

    // This class implement variant of the scrollable selector which can be
    // resized vertically
    
    OLYMPVerticallyResizeableScrollableSelector: o(
        {
            "class": o("DraggableEdgeBottom", "OLYMPScrollableSelector"),

            // one still needs to set the initial position (see documentation
            // of DraggableEdgeBottom).
        },

        {
            qualifier: { verticalResizeBeingDragged: true },
            
            children: { selector: { description: {
                context: {
                    // set to indicate to the scroll mechanism that resizing
                    // is taking place.
                    scrollViewBeingResized: true
                }
            }}}
        },
    ),
    
    OLYMPScrollableSelectorDesign: o(
        {
            context: {
                hasTitle: [notEmpty, [{ children: { title: _ }}, [me]]]
            },
            position: {
                // default, if there are no other elements (title/search)
                listBelowOtherElements: {
                    point1: { type: "top", element: [me] },
                    point2: {
                        type: "top",
                        element: [{ children: { selector: _ }}, [me]]
                    },
                    equals: 0
                },
                // not below bottom of embedding
                notBeyondBottom: {
                    point1: { type: "bottom" },
                    point2: { type: "bottom", element: [embedding] },
                    min: 0
                }
            },
            children: {
                selector: { description: {
                    "class": "OLYMPSelectorScrolledListDesign",
                    position: {
                        left: 0,
                        right: 0,
                        bottom: 0
                    }
                }}
            }
        },
        {
            qualifier: { hasTitle: true, hasSearch: false },

            position: {
                listBelowOtherElements: {
                    point1: {
                        type: "bottom",
                        element: [{ children: { title: _ }}, [me]]
                    }
                }
            }
        },
        {
            qualifier: { hasSearch: true },

            position: {
                listBelowOtherElements: {
                    point1: {
                        type: "bottom",
                        element: [{ children: { search: _ }}, [me]]
                    }
                },
                searchTop: {
                    point2: {
                        type: "top",
                        element: [{ children: { search: _ }}, [me]]
                    },
                    equals: 0
                }
            }
        },
        {
            qualifier: { hasTitle: true, hasSearch: true },

            position: {
                searchTop: {
                    point1: {
                        type: "bottom",
                        element: [{ children: { title: _ }}, [me]]
                    }
                }
            }
        },

        {
            qualifier: { hasTitle: false, hasSearch: true },

            position: {
                searchTop: {
                    point1: { type: "top", element: [me] }
                }
            }
        }
        
    ),

    OLYMPSelectorScrolledListDesign: o(
        {
            context: {
                itemSize: [
                    first,
                    o([{ scrollableSelectorItemSize: _ }, [globalDefaults]], 30)
                ],
                itemSpacing: 0,

                isDraggable: true,
                
                scrollbarWidth: 8,
                scrollbarEdgeOffset: 2,

                scrollbarCursorColor: [
                    { selectorScrollbarCursorColor: _ },
                    [myContext, "OLYMPSelectorDesign"]],
                scrollbarCursorOpacity: 0.5,
                scrollbarCursorBorderRadius: 5 
            }
        }
    ),

    OLYMPScrollableSelectorItem: o(
        {
            "class": "OLYMPSelectorItem",

            display: {
                borderLeftWidth: 4,
                padding: 4,
                text: {
                    textAlign: "left"
                }
            }
        }
    ),
    
    //
    // Matrix selector
    //
    
    OLYMPMatrixSelector: o(
        {
            "class": o("OLYMPMatrixSelectorDesign"),
            children: {
                selector: { description: {
                    "class": o("OLYMPSelectorAllValues",
                               { name: "MatrixSelector",
                                 itemClass: "OLYMPMatrixSelectorItem" }),
                    context: {
                        facetName: [{ facetName: _ }, [embedding]],
                        isRadioSelector: [{ isRadioSelector: _ }, [embedding]]
                    }
                }}
            }
        }
    ),

    OLYMPMatrixSelectorDesign: o(
        {
            children: {
                selector: { description: {
                    "class": o("OLYMPSelectorMatrixDesign","WrapChildren"),
                    context: {
                        // wrap children only from below
                        wrapHorizontalMargin: false,
                        wrapTopMargin: false,
                        wrapBottomMargin: 2
                    },
                    position: {
                        left: 3,
                        right: 3,
                        belowTitleOrSearch: {
                            point1: {
                                type: "bottom",
                                element: [
                                    { children: { title: _ }}, [embedding]]
                            },
                            point2: { type: "top" },
                            equals: 2
                        },
                        firstItemAtTop: {
                            point1: { type: "top" },
                            point2: {
                                type: "top",
                                element: [first, [{ matrixItems: _ }, [me]]]
                            },
                            equals: 2
                        }
                    }
                }}
            }
        },
        {
            qualifier: { dontShowSelectors: true },

            context: {
                wrapBottomMargin: false
            },

            position: {
                wrapBottomOfTitle: {
                    point1: {
                        type: "bottom",
                        element: [{ children: { title: _ }}, [me]]
                    },
                    point2: { type: "bottom" },
                    equals: 0
                }
            }
        },
        {
            qualifier: { hasSearch: true },

            children: {
                selector: { description: {
                    position: {
                        belowTitleOrSearch: {
                            point1: {
                                element: [
                                    { children: { search: _ }}, [embedding]]
                            },
                        }
                    }
                }}
            }
        },
        {
            qualifier: { facetName: "MS" },

            // reorder the selector values
            children: { selector: { description: {
                context: {
                    sortedItemsToShow: [
                        sort,
                        [{ itemsToShow: _ }, [me]],
                        c(unmatched, "TC"),
                    ]
                }
            }}}
        }
    ),

    OLYMPSelectorMatrixDesign: o(
        {
            context: {
                minMatrixSpacing: 3,
                maxMatrixSpacing: 3,
                matrixSelectorItemMinWidth: 70,
                matrixSelectorItemMaxWidth: 140,
                preferredMinSize: 70,
                preferredMinSpacing: 3,
                orthogonalSpacing: 3,

                matrixSelectorItemHeight: 35,
            },
            position: {
                left: 0,
                right: 0
            }
        },

        {
            qualifier: { facetName: "Fund" },

            context: {
                matrixSelectorItemMinWidth: 40,
                preferredMinSize: 40,
            }
        },

        {
            qualifier: { facetName: "Dimension_Type" },

            context: {
                matrixSelectorItemMinWidth: 100,
                preferredMinSize: 100,
                matrixSelectorItemMaxWidth: 200,
                matrixSelectorItemHeight: 40,
            }
        }
    ),

    OLYMPMatrixSelectorItem: o(
        {
            "class": "OLYMPSelectorItem",

            display: {
                borderWidth: 2,
            },

            position: {
                height: [{ matrixSelectorItemHeight: _ },
                         [my, "OLYMPSelectorMatrixDesign"]],
                minWidth: {
                    point1: { type: "left" },
                    point2: { type: "right" },
                    min: [{ matrixSelectorItemMinWidth: _ },
                          [my, "OLYMPSelectorMatrixDesign"]],
                },

                maxWidth: {
                    point1: { type: "left" },
                    point2: { type: "right" },
                    max: [{ matrixSelectorItemMaxWidth: _ },
                          [my, "OLYMPSelectorMatrixDesign"]],
                },
            },
        },

        {
            qualifier: { isNotFirstInSubSequence: false },

            position: {
                left: 0
            }
        }
    ),

    // special types of selectors

    OLYMPDimensionSelector: o(
        {
            "class": "OLYMPSelectorContext",
            
            children: {
                dimensionTypeSelector: { description: {
                    "class": o("OLYMPDimensionTypeSelector"),
                    
                    position: {
                        top: 0,
                        left: 0,
                        right: 0
                    },
                }},
                
                dimensionTitleSelector: { description: {
                    "class": "OLYMPDimensionTitleSelector",
                    position: {
                        left: 0,
                        right: 0,
                        justUnderTypeSelector: {
                            point1: {
                                type: "bottom",
                                element: [{
                                    children: { dimensionTypeSelector: _ }},
                                          [embedding]]
                            },
                            point2: { type: "top" },
                            equals: 0
                        },
                        bottom: 0
                    }
                }},
            }
        }
    ),

    // Use this class with panelSide right/left for a dimension selector
    // which is a right or left panel (which can be resized horizontally).

    OLYMPSidePanelDimensionSelector: o(
        {
            "class": o("OLYMPDimensionSelector"),

            context: {
                // left or right
                panelSide: [{ dimensionSelectorPanelSide: _ },
                            [my, "OLYMPSliceEditor"]],
                
                // define the initial width
                // initialWidth: ?

                // stored width (in case we want to return to it, for example,
                // when the search panel is opened)
                "^storedWidth": o(), 
                
                // is the search panel open?
                searchIsOpen: [
                    { isOpen: _ },
                    [{ children: { search: _ }},
                     [{ children: { dimensionTitleSelector: _ }}, [me]]]]
            },
            
            position: {
                top: 0,
                bottom: 0,
            }
        },

        {
            qualifier: { searchIsOpen: false },
            write: {
                searchPanelAboutToBeOpened: {
                    upon: [{ type: "MouseDown",
                             recipient: [
                                 { children: { search: _ }},
                                 [{ children: { dimensionTitleSelector: _ }},
                                  [me]]] }, [message]],
                    true: {
                        storeWidth: {
                            to: [{ storedWidth: _ }, [me]],
                            merge: [offset, { type: "left" }, { type: "right" }]
                        }
                    }
                }
            }
        },
        
        {
            qualifier: { storedWidth: true },

            position: {
                initialWidth: {
                    equals: [{ storedWidth: _ }, [me]]
                }
            },

            write: {
                searchPanelOpened: {
                    upon: [{ searchIsOpen: _ }, [me]],
                    true: {
                        resetWasDragged: {
                            to: [{ horizontalResizeWasDragged: _ }, [me]],
                            merge: false
                        }
                    }
                }
            }
        },
        
        {
            qualifier: { panelSide: "right" },

            "class": o("DraggableEdgeLeft"),

            context: {
                draggableEdgeLeftIsResize: true
            },

            position: {
                right: 0
            }
        },
        {
            qualifier: { panelSide: "left" },

            "class": o("DraggableEdgeRight"),

            context: {
                draggableEdgeRightIsResize: true
            },

            position: {
                left: 0
            },

            // adjust the response area of the drag handle so that it does not
            // cover the scrollbar.

            children: { rightDragHandle: { description: {
                context: {
                    responseWidth: 10,
                    responseCenterHorizontalOffset: 4
                }
            }}}
        }
    ),
    
    // Use this class if you want the dimension selector to be draggable.
    // One still needs to set its initial position (see the documentation
    // of DraggableInContainer and DraggableEdgeBottom for this).
    
    OLYMPDraggableDimensionSelector:  o(
        {
            "class": o("OLYMPDimensionSelector", "DraggableInContainer",
                       "DraggableEdgeBottom"),
            
            context: {
                dragInContainerHandle: [
                    { children: { dragHandle: _ }}, [me]]
                // define here the initial offset and width
                // initialWidth: ?
                // initialLeft: ?
                // initialRight: ?
                // initialTop: ?
                // initialBottomSpacing: ?
            },
            
            children: {
                dragHandle: { description: {
                    "class": "DraggableInContainerHandle",
                    // the drag handle is positioned over the title of
                    // the type selector, but without overlapping the open
                    // menu button.
                    context: {
                        titleArea: [
                            { children: { title: _ }},
                            [{ children: { dimensionTypeSelector: _ }},
                             [embedding]]],
                        menuButton: [
                            { children: { openCloseButton: _ }},
                            [{ titleArea: _ }, [me]]]
                    },
                    stacking: {
                        aboveSiblings: {
                            lower: [embedding],
                            higher: [me]
                        }
                    },
                    position: {
                        alignTitleLeft: {
                            point1: { type: "left" },
                            point2: { type: "left",
                                      element: [{ titleArea: _ },[me]] },
                            equals: 0
                        },
                        alignTitleTop: {
                            point1: { type: "top" },
                            point2: { type: "top",
                                      element: [{ titleArea: _ },[me]] },
                            equals: 0
                        },
                        alignTitleBottom: {
                            point1: { type: "bottom" },
                            point2: { type: "bottom",
                                      element: [{ titleArea: _ },[me]] },
                            equals: 0
                        },
                        attachToButtonRight: {
                            point1: { type: "right" },
                            point2: { type: "left",
                                      element: [{ menuButton: _ },[me]] },
                            equals: 0
                        }
                    }
                }},
                
                dimensionTypeSelector: { description: {
                    "class": o("DraggableEdgeRight"),
                    context: {
                        draggableEdgeRightIsResize: true,
                        initialWidth: [{ initialWidth: _ }, [embedding]],
                    }
                }},

                dimensionTitleSelector: { description: {
                    context: {
                        // indicate to the scrolled list that the view is
                        // being resized
                        verticalResizeBeingDragged: [
                            { verticalResizeBeingDragged: _ }, [embedding]]
                    }
                }}
            }
        }
    ),
    
    OLYMPDimensionTypeSelector: o(
        {
            "class": o("OLYMPMatrixSelector", "OLYMPSelector",
                       "FacetSelectorContext",
                       "OLYMPDimensionTypeSelectorDesign"),
            
            context: {
                selectionChain: [
                    { dimensionTypeSelectionChain: _ },
                    [{ slice: _ }, [my, "OLYMPSliceEditor"]]],
                selectorName: "Dimension_Type",
                isRadioSelector: true,
                "^dontShowSelectors": true,
                selectedDimensionType: [{ selectedDimensionType: _},
                                        [myContext, "OLYMPSelector"]],
                title: [first,
                        o([{ facetName: [{ selectedDimensionType: _ }, [me]],
                             title: _ },
                           [{ facetTitleTranslation: _ },
                            [myContext,"FacetSelector"]]],
                      [{ selectedDimensionType: _ }, [me]])],
                initialWidth: [{ intialWidth: _ }, [embedding]]
            },

            display: {
                // same color as title
                background: [
                    { selectorTitlePalette: { background: _ }},
                             [myContext, "OLYMPSelectorDesign"]]
            },
            
            children: { title: { description: {
                "class": o("OLYMPMenuSelectorTitle")
            }}}
        }
    ),

    OLYMPDimensionTypeSelectorDesign: o(
        {
            "class": o("WrapChildren", "OLYMPSelectorItemContext"),
            
            context: {
                wrapBottomMargin: 4,
                // For each of the following cases, define some or all of the
                // following properties
                // background,
                // borderColor,
                // (borderWidth is not specified here, as different item
                // classes display different borders).
                // mouseOverBackground,
                // fontSize,
                // textColor,
                // fontWeight
                itemSelectedAvailableDesign: [
                    { selectorTitlePalette: { selectedMenuItem: _ }},
                    [myContext, "OLYMPSelectorDesign"]],
                itemNotSelectedAvailableDesign: [
                    { selectorTitlePalette: { notSelectedMenuItem: _ }},
                    [myContext, "OLYMPSelectorDesign"]],
            },

            // constraints for determining the width of the selector
            position: {
                // assign a minimal width
                minWidth: {
                    point1: { type: "left" },
                    point2: { type: "right" },
                    min: 150, // xxxxxxxxxxx temporary
                }
            },
        }
    ),
    
    OLYMPDimensionTitleSelector: o(

        {
            "class": o("OLYMPScrollableSelectorDesign",
                       "OLYMPSelectorDesign",
                       "OLYMPSelector", "OLYMPScrollableSelector",
                       "FacetSelectorContext", "OLYMPSelectorItemContext"),
            context: {
                selectorName: "Dimension_title",
                selectedDimensionType: [
                    { selectedDimensionType: _ }, [myContext, "OLYMPSelector"]],
                selectionChain: [
                    { selectionChain: _ }, [myContext, "OLYMPSelector"]],
                facetName: [{ selectedDimensionType: _}, [me]],
            },
        },

        {
            qualifier: { facetName: "InterventionField" },

            "class": "SelectorWithSearch",
            context: {
                hasSearch: true
            },
            children: { search: { description: {
                "class": "OLYMPInterventionFieldSearch"
            }}}
        },

        {
            // applies only if the area is (vertically) resizeable
            qualifier: { verticalResizeBeingDragged: true },
            
            children: { selector: { description: {
                context: {
                    // set to indicate to the scroll mechanism that resizing
                    // is taking place.
                    scrollViewBeingResized: true
                }
            }}}
        },
    ),
    
    //
    // Additional selector components
    //
    
    OLYMPSelectorTitle: o(
        {
            display: {
                background: [{ selectorTitlePalette: { background: _ }},
                             [myContext, "OLYMPSelectorDesign"]],
                text: {
                    fontSize: 14,
                    fontFamily: "sans-serif",
                    color: [{ selectorTitlePalette: { textColor: _ }},
                            [myContext, "OLYMPSelectorDesign"]],
                    value: [{ title: _ }, [embedding]]
                }
            },

            position: {
                top: 0,
                left: 0,
                right: 0,
                height: 35
            },
        }
    ),

    OLYMPMenuSelectorTitle: o(
        {
            "class": "OLYMPSelectorTitle",

            context: {
                dontShowSelectors: [{ dontShowSelectors: _ }, [embedding]]
            },

            children: { openCloseButton: { description: {
                "class": "OLYMPMenuTitleOpenCloseButton",
                position: {
                    width: 19,
                    height: 19,
                    "vertical-center": 0,
                    right: 10
                }
            }}}
        }
    ),

    OLYMPMenuTitleOpenCloseButton: o(
        {
            context: {
                dontShowSelectors: [{ dontShowSelectors: _ }, [embedding]],
                pointerInArea: [{ param: { pointerInArea: true }}, [me]],
            },
            display: {
                padding: 4,
            },
            write: { toggleOpenClosed: {
                upon: [{ type: "MouseUp",
                         subType: o("Click","DoubleClick") },
                       [myMessage]],
                true: { toggleOpenClosed: {
                    to: [{ dontShowSelectors: _ }, [me]],
                    merge: [not, [{ dontShowSelectors: _ }, [me]]]
                }}
            }}
        },

        {
            qualifier: { pointerInArea: true },

            display: {
                background: [{ selectorTitlePalette:
                               { toggleMenuButtonHoverColor: _ }},
                             [myContext, "OLYMPSelectorDesign"]]
            }
        },
        
        {
            qualifier: { dontShowSelectors: true },
            display: {
                triangle: {
                    baseSide: "top",
                    color: [
                        { selectorTitlePalette: { toggleMenuTriangleColor: _ }},
                        [myContext, "OLYMPSelectorDesign"]]
                }
            }
        },

        {
            qualifier: { dontShowSelectors: false },
            display: {
                triangle: {
                    baseSide: "bottom",
                    color: [
                        { selectorTitlePalette: { toggleMenuTriangleColor: _ }},
                        [myContext, "OLYMPSelectorDesign"]]
                }
            }
        }
    ),
};

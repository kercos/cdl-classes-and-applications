
// %%classfile%%: "../../23_CrossCuttingThemes/crossCuttingThemes.js"
// %%classfile%%: "../../23_CrossCuttingThemes/themeMenu.js"
// %%classfile%%: "../../23_CrossCuttingThemes/themeMenuPileDesign.js"
// %%classfile%%: "../data/OLYMPData.js"

// This file implements classes which create a theme manager and theme menu
// for the OLYMP intervention field cross-cutting themes.
// These classes use the  general purpose theme manager/menu classes and
// mainly specify design choices and access to the source data. 

// The theme manager uses the OLYMP intervention field cross cutting theme
// list available here:
//
// https://cohesiondata.ec.europa.eu/EU-Level/OLYMP-2014-2020-Categorisation-Crosscutting-Themes-/xns4-t7ym?row_index=18
//
// The original input table was downloaded as a csv file and edited as follows:
// 1. The codes appearing in the first column (Cross_cutting_theme)
//    were split into two columns: one for the numeric code and one for the
//    string. The string remains in the column Cross_cutting_theme
//    while the number was placed in the first column which is
//    Cross_cutting_theme_code. Rows in which the cross cutting theme
//    does not have a number (these are the CLIMATE WEIGHTING and
//    BIODIVERSITY WEIGHTING rows) have an empty value in the
//    Cross_cutting_theme_code column.
//
// The classes here also (optionally) use a theme translation table to
// translate theme names to the themes being displayed.

var classes = {

    //
    // Theme Manager
    //
    
    OLYMPCrossCuttingThemeManager: o(
        {
            "class": o("CrossCuttingThemeManager"),

            context: {

                // categorization of intervention fields to cross cutting
                // themes.
                categorization: [{ categorization: _ },
                                 [areaOfClass, "OLYMPCrossCuttingThemeData"]],
                
                // the name of the field in which the theme names appear 
                themeFieldName: "Cross_cutting_theme",
                // the name of the field in which the internvention field
                // names (or codes) are stored
                itemFieldName: "Intervention_field_Code",

                themeTranslationFile: "../../../../data/OLYMP/OLYMP_2014-2020_Categorisation_Crosscutting_Themes_Display.csv",
                // translation from the original theme names in the database
                // to the displayed theme names. Themes which do not appear
                // in this table do not require any translation.
                themeTranslation: [
                    { themeTranslation: _ },
                    [areaOfClass, "OLYMPCrossCuttingThemeDisplayData"]],

                // function to get the display name of the argument theme.
                getDisplayName: [
                    defun, "conceptName",
                    [first,
                     o([{ Cross_cutting_theme_display: _ },
                        [{ Cross_cutting_theme: "conceptName" },
                         [{ themeTranslation: _ }, [me]]]], "conceptName")]],

                // functions to translate among intervention field
                // names (code <-> short name <-> long name)

                translateIFCodeToShort: [
                    defun, "IFCode",
                    [first, o([{ Code_title_short: _,
                                 Intervention_field_Code: "IFCode" },
                               [{ categorization: _ }, [me]]], "IFCode")]
                ]
            },

            children: {
                // the following child areas read the data for the cross cutting
                // theme manager
                crossCuttingThemeData: { description: {
                    "class": "OLYMPCrossCuttingThemeData"
                }},
                crossCuttingThemeDisplayData: { description: {
                    "class": "OLYMPCrossCuttingThemeDisplayData"
                }},
                
            }
        }
    ),

    //
    // Theme Menu
    //
    
    OLYMPThemeMatrixContext: o(
        {
            context: {
                // colors
                colorPalette: mustBeDefined,
                
                defaultPrimaryColor: [
                    { colorPalette: { defaultPrimaryColor: _ }}, [me]],
                selectedDefaultPrimaryColor: [
                    { colorPalette: { selectedDefaultPrimaryColor: _ }}, [me]],
                lightPrimaryColor: [
                    { colorPalette: { lightPrimaryColor: _ }}, [me]],
                selectedLightPrimaryColor: [
                    { colorPalette: { selectedLightPrimaryColor: _ }}, [me]],
                intermediatePrimaryColor: [
                    { colorPalette: { intermediatePrimaryColor: _ }}, [me]],
                selectedIntermediatePrimaryColor: [
                    { colorPalette: {
                        selectedIntermediatePrimaryColor: _ }}, [me]],
                textForDefaultPrimaryColor: [
                    { colorPalette: { textForDefaultPrimaryColor: _ }}, [me]],
                selectedTextForDefaultPrimaryColor: [
                    { colorPalette: {
                        selectedTextForDefaultPrimaryColor: _ }}, [me]],
                textForLightPrimaryColor: [
                    { colorPalette: { textForLightPrimaryColor: _ }}, [me]],
                selectedTextForLightPrimaryColor: [
                    { colorPalette: {
                        selectedTextForLightPrimaryColor: _ }}, [me]],
                topLevelDividerColor: [
                    { colorPalette: { topLevelDividerColor: _ }}, [me]],
                topLevelBackgroundColor: [
                    { colorPalette: { topLevelBackgroundColor: _ }}, [me]],
                pileBorderColor: [
                    { colorPalette: { pileBorderColor: _ }}, [me]],
                cornerArrowColor: [
                    { colorPalette: { cornerArrowColor: _ }}, [me]],
                highlightedCornerArrowColor: [
                    { colorPalette: { highlightedCornerArrowColor: _ }}, [me]],

                fonts: mustBeDefined,
                
                topThemeFontSize: [
                    { topThemeFontSize: _ }, [{ fonts: _ }, [me]]],
                subThemeFontSize: [
                    { subThemeFontSize: _ }, [{ fonts: _ }, [me]]]
            }
        }
    ),
    
    OLYMPThemeMatrix: o(
        {
            "class": o("ThemeMatrix","SelectableThemeMatrixExt",
                       "OLYMPThemeMatrixContext"),

            context: {

                // access to themes and their sub-themes
                
                topLevelThemes: [
                    { topLevelThemes: _ },
                    [areaOfClass, "OLYMPCrossCuttingThemeManager"]],
                subThemes: [{ children: { themes: _ }},
                            [areaOfClass, "OLYMPCrossCuttingThemeManager"]],

                // list of selected themes. Each entry in this list is of
                // the form { themeName: <name>, isSelected: true|false } 
                "^selectedThemes": o(), 
                
                // layout options

                // width of matrix in number of cells
                
                matrixWidth: 3,
                // matrixOverflow: 0
                // useExpansionPositions: false,
                
                // cell size (including possible margins).
                
                cellWidth: 120, // 130,
                cellHeight: 40,

                matrixMargin: 2,
            },

            display: {
                background: [{ topLevelDividerColor: _ }, [me]]
            },
            
            children: {
                topLevelThemeItems: { description: {
                    "class": "OLYMPTopLevelThemeMatrixItem",
                }}
            }
        },
        {
            // set border beyond the "cell" of the matrix (if margin is defined)
            qualifier: { matrixMargin: true },

            position: {
                topMargin: {
                    point1: { type: "top" },
                    point2: { label: "cellTop" },
                    equals: [{ matrixMargin: _ }, [me]]
                },
                leftMargin: {
                    point1: { type: "left" },
                    point2: { label: "cellLeft" },
                    equals: [{ matrixMargin: _ }, [me]]
                },
                bottomMargin: {
                    point1: { label: "cellBottom" },
                    point2: { type: "bottom" },
                    equals: [{ matrixMargin: _ }, [me]]
                },
                rightMargin: {
                    point1: { label: "cellRight" },
                    point2: { type: "right" },
                    equals: [{ matrixMargin: _ }, [me]]
                }
            },
        }
    ),

    // This class is shared by both the top-level theme areas and the
    // sub-theme areas.
    
    OLYMPThemeItem: o(
        {
            "class": "OLYMPThemeItemColors",
            
            context: {
                // name to be displayed
                displayThemeName: [
                    [{ getDisplayName: _ }, [areaOfClass,
                                             "OLYMPCrossCuttingThemeManager"]],
                    [{ themeName: _ }, [me]]],
            },
        }
    ),
    
    OLYMPTopLevelThemeMatrixItem: o(
        {
            "class": o("TopThemeItemWithCloseSubThemePileExt",
                       "OLYMPThemeItem"),
            context: {
                cellPadding: 1,
            }
        },

        {
            qualifier: { hasSubThemes: false },
            display: {
                // the background color for top themes with sub-themes is
                // determined by 'pileBackgroundColor' below. 
                background: [{ defaultPrimaryColor: _ }, [me]],
            }
        },
        
        {
            qualifier: { hasSubThemes: true },

            // prooperties when the area has sub-themes (actually needed
            // only when the area is closed)

            context: {
                pileVShift: 3,
                pileHShift: 5,
                pileColors: o(
                    [{ defaultPrimaryColor: _ }, [me]],
                    [{ intermediatePrimaryColor: _ }, [me]],
                    [{ lightPrimaryColor: _ }, [me]]),
                pileBorderColor: [{ pileBorderColor: _ },
                                  [myContext, "OLYMPThemeMatrix"]],
                pileBackgroundColor: [{ topLevelBackgroundColor: _ },
                                      [myContext, "OLYMPThemeMatrix"]],

                // transition time when opening the top item
                transitionTime: 0.5
            },

            children: {
                subItems: {
                    description: {
                        // OLYMP specific properties of the sub-theme children
                        "class": "OLYMPSubThemeItem"
                    }
                },
                toggleSwitch: {
                    description: {
                        // design class for thi toggle switch
                        "class": "OLYMPTopThemeToggleOpenButton"
                    }
                }
            }
        },
        
        {
            qualifier: { hasSubThemes: true, isOpen: true },

            display: {
                background: [{ defaultPrimaryColor: _ }, [me]],
            }
        },
        
        {
            // when the top theme has sub-themes, the name of the top-theme
            // is displayed on the appropriate sub-theme even when the
            // top theme is closed.
            
            qualifier: { isOpen: false, hasSubThemes: false },

            display: {
                text: {
                    fontFamily: "sans-serif",
                    fontSize: [{ topThemeFontSize: _ },
                               [myContext, "OLYMPThemeMatrix"]],
                    color: [{ textForDefaultPrimaryColor: _ }, [me]],
                    value: [{ displayThemeName: _ }, [me]]
                }
            }
        },
        
        {
            qualifier: { isOpen: true },
            display: {
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: [{ defaultPrimaryColor: _ },
                              [myContext, "OLYMPThemeMatrix"]],
            }
        }
    ),

    OLYMPSubThemeItem: o(
        {
            "class": "OLYMPThemeItem",

            display: {
                text: {
                    fontFamily: "sans-serif",
                }
            }
        },
        
        {
            qualifier: { isTopThemeOpen: true },
            context: {
                cellPadding: 0,
            },
            
            display: {
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: [{ defaultPrimaryColor: _ },
                              [myContext, "OLYMPThemeMatrix"]],
                padding: 2,
                text: {
                    value: [{ displayThemeName: _ }, [me]]
                }
            },
        },

        {
            qualifier: { isTopTheme: true },

            display: {
                text: {
                    fontSize: [{ topThemeFontSize: _ },
                               [myContext, "OLYMPThemeMatrix"]],
                    color: [{ textForDefaultPrimaryColor: _ }, [me]],
                    value: [{ displayThemeName: _ }, [me]]
                }
            }
        },
        
        {
            qualifier: { isTopThemeOpen: true, isTopTheme: true },

            display: {
                background: [{ defaultPrimaryColor: _ }, [me]],
            }
        },

        {
            qualifier: { isTopThemeOpen: true, isTopTheme: false },

            display: {
               
                background: [{ lightPrimaryColor: _ }, [me]],

                text: {
                    fontSize: [{ subThemeFontSize: _ },
                               [myContext, "OLYMPThemeMatrix"]],
                    color: [{ textForLightPrimaryColor: _ }, [me]],
                }
            }
        }
    ),

    // class (included in every theme item) which determines the set of
    // colors to be used.
    
    OLYMPThemeItemColors: o(
        {
            context: {
                // default default primary color
                defaultPrimaryColor: [
                    { defaultPrimaryColor: _ }, [myContext, "OLYMPThemeMatrix"]],
                // color for the pile: intermediate between default and light
                intermediatePrimaryColor: [
                    { intermediatePrimaryColor: _ },
                    [myContext, "OLYMPThemeMatrix"]],
                // default light primary color
                lightPrimaryColor: [{ lightPrimaryColor: _ },
                                    [myContext, "OLYMPThemeMatrix"]],
                
                // color of text for the primary background color. The default
                // may be modified by various classes and variants below.
                textForDefaultPrimaryColor: [{ textForDefaultPrimaryColor: _ },
                                             [myContext, "OLYMPThemeMatrix"]],
                // color of text for the lighter background color. The default
                // may be modified by various classes and variants below.
                textForLightPrimaryColor: [{ textForLightPrimaryColor: _ },
                                           [myContext, "OLYMPThemeMatrix"]],
            },
        },

        {
            qualifier: { isSelected: true },

            context: {
                textForDefaultPrimaryColor: [
                    { selectedTextForDefaultPrimaryColor: _ },
                    [myContext, "OLYMPThemeMatrix"]],
                defaultPrimaryColor: [
                    { selectedDefaultPrimaryColor: _ },
                    [myContext, "OLYMPThemeMatrix"]
                ],
                intermediatePrimaryColor: [
                    { selectedIntermediatePrimaryColor: _ },
                    [myContext, "OLYMPThemeMatrix"]],
                textForLightPrimaryColor: [
                    { selectedTextForLightPrimaryColor: _ },
                    [myContext, "OLYMPThemeMatrix"]],
                lightPrimaryColor: [
                    { selectedLightPrimaryColor: _ },
                    [myContext, "OLYMPThemeMatrix"]],
            }
        },

        {
            qualifier: { hasSelectedSubThemes: true },

            context: {
                intermediatePrimaryColor: [
                    { selectedIntermediatePrimaryColor: _ },
                    [myContext, "OLYMPThemeMatrix"]],
                lightPrimaryColor: [
                    { selectedLightPrimaryColor: _ },
                    [myContext, "OLYMPThemeMatrix"]],
            }
        }
    ),

    
    // This class inherits some properties fro the base class
    // TopThemeToggleOpenButton
    
    OLYMPTopThemeToggleOpenButton: o(
        {
            context: {
                cornerArrowColor: [{ cornerArrowColor: _ },
                                   [myContext, "OLYMPThemeMatrix"]], 
            },
            
            position: {
                right: 0,
                bottom: 0,
                width: 20,
                height: 20
            },
        },

        {
            qualifier: { pointerInArea: true },

            context: {
                cornerArrowColor: [{ highlightedCornerArrowColor: _ },
                                   [myContext, "OLYMPThemeMatrix"]],
            }
        },

        {
            qualifier: { pointerInTopTheme: true, isTopThemeOpen: false },
            "class": "OLYMPExpandThemeArrow"
        },

        {
            qualifier: { pointerInTopTheme: true, isTopThemeOpen: true },
            "class": "OLYMPMinimizeThemeArrow"
        }
    ),

    // Design element for expand and minimize buttons
    
    OLYMPExpandThemeArrow: {
        display: {
            opacity: 0.1,
            background: "#404040",
        },
        children: { cornerArrow: { description: {
            position: {
                frame: 3
            },
            display: {
                borderColor: [{ cornerArrowColor: _ }, [embedding]],
                borderStyle: "solid",
                borderRightWidth: 2,
                borderBottomWidth: 2
            },
                
            children: { innerCorner: { description: {
                position: { top: 3, bottom: 2, left: 3, right: 2 },
                display: {
                    borderColor: [{ cornerArrowColor: _ },
                                  [embedding, [embedding]]],
                    borderStyle: "solid",
                    borderRightWidth: 2,
                    borderBottomWidth: 2
                }
            }}}
        }}}
    },

    OLYMPMinimizeThemeArrow: {
        children: { cornerArrow: { description: {
            position: {
                frame: 3
            },
            display: {
                borderColor: [{ cornerArrowColor: _ }, [embedding]],
                borderStyle: "solid",
                borderLeftWidth: 2,
                borderTopWidth: 2
            },
                
            children: { innerCorner: { description: {
                position: { top: 2, bottom: 3, left: 2, right: 3 },
                display: {
                    borderColor: [{ cornerArrowColor: _ },
                                  [embedding, [embedding]]],
                    borderStyle: "solid",
                    borderLeftWidth: 1,
                    borderTopWidth: 1
                }
            }}}
        }}}
    }
};

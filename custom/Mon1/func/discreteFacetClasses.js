// Copyright 2017 Yoav Seginer, Theo Vosse, Gil Harari, and Uri Kolodny.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// %%classfile%%: <discreteFacetDesignClasses.js>

var classes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    DiscreteOverlayXWidget: o(
        { // default
            "class": o(
                //"OverlayXWidgetGirth", // inherited before BDiscreteOverlayXWidget to ensure we override the overlayXWidget value provided by the latter
                superclass
            )
        },
        {
            qualifier: { discreteWidgetABTest: "Circles" },
            "class": "OverlayXWidgetGirth"
        },
        {
            qualifier: { discreteWidgetABTest: "Form" },
            context: {
                overlayXWidgetGirth: bDiscretePosConst.discreteCellSideInFormTest
            }
        }
    ),

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    DiscretePermOverlayXWidget: {
        "class": o("DiscretePermOverlayXWidgetDesign", superclass),
        children: {
            overlayXWidgetContentFrame: {
                description: {
                    "class": "DiscreteOverlayXWidgetContentFrame"
                }
            }
        }
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    DiscreteOverlayXWidgetContentFrame: {
            "class": o("DiscreteOverlayXWidgetContentFrameDesign", "GeneralArea", "TrackMyWidget"),
            position: {
                attachTopToMyDiscreteValuesView: {
                    point1: {
                        element: [{ myWidget: { myDiscreteValuesView: _ } }, [me]],
                        type: "top"
                    },
                    point2: {
                        type: "top"
                    },
                    equals: 0
                },
                attachBottomToMyDiscreteValuesView: {
                    point1: {
                        type: "bottom"
                    },
                    point2: {
                        element: [{ myWidget: { myDiscreteValuesView: _ } }, [me]],
                        type: "bottom"
                    },
                    equals: 0
                },
                left: 0,
                right: 0
            }
        },
        
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    DiscreteHistogramBin: {
        "class": o("DiscreteHistogramBinDesign", superclass)
    }
};
# Editor Conventions
The Editor will likely be one fo the more complicated sections for the frontend of this project, as such I will provide
some instructions here for myself and others.

## Layout Engine
The Editor.js file is intended to simply control the dragging and dropping of other react components into a nice layout.
It also allows the user to interface with each components data schema to manipulate page contents. It also handles
the layout and component serialization and deserialization.

## Components
Each component should have its own folder with at least 2 files in it, a `.jsx` file and the `.scss` companion file. 

## Data Schema
Each component should export a `SCHEMA` constant that can be interpreted by the layout engine. the structure of
this schema is loosely based off [JSON Schema](https://json-schema.org/). Fields marked with a `*` are required

    export const SCHEMA = {
      type: <COMPONENT_NAME>,
      gridOptions: { h: *int, w: *int, minW: int, minH: int, maxW: int, maxW: int },
      props: {
        <parameter_name>: {
            type: *<TYPE>,
            name: *string,
            desc: string,
            default: string,
        }
      }
    };
    
`COMPONENT_NAME` should be the name of the component also exported from that file which in turn should be the name of the JSX file.

`TYPE` can be any of the following primitives, "String", "Int", "Number", "Boolean". In addition to primitives it can
also be "Array" which will allow the components to support arbitrary numbers of parameters.

#### Array
    props: {
        <parameter_name>: {
            type: "Array",
            items: {
                type: *<TYPE>,
                name: *string,
                desc: string,
                default: string,
            }
        }
      }
      
The `props` are what get displayed in the editor window for the user to made edits to.

## Styling
Each component should have its own `.scss` file that it gets styling from. The class names should be very specific to
avoid any cross styling conflicts. Something like '<component_name>-main-background' should be good.

# Component Index
In order for the layout engine to be aware of all the avalable components they must each be added to the `EDITOR_CONSTANTS.js`
file. This is where the Editor pulls all the available components from.
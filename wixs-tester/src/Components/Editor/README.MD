# Editor Conventions
The Editor will likely be one of the more complicated sections for the frontend of this project, as such I will provide
some instructions here for myself and others.

# Layout Engine
The Editor.js file is intended to control dragging and dropping of react components into a nice layout.
It also allows the user to interface with each component's data schema to manipulate page contents. Finally, it handles
the layout and component serialization / deserialization.

# Components
Each component should have its own folder with at least 2 files in it, a `.jsx` file and the `.scss` companion file. 

### Component Backlog
 - [ ] Bootstrap card (title, body, footer)
 - [ ] Image block (using outside image source ie imgur etc)
 - [ ] Image block with text overlay (outside image source)
 
### Components Icebox
These are some components that we should create but I (Nathan) need to add more editor functionality before
they can be added.

 - [ ] Image block (needs support for parsing user images)
 - [ ] Nav-Bar (needs support for multiple pages and links, variable length props [])


## Data Schema
Each component should export a `SCHEMA` constant that can be interpreted by the layout engine. the structure of
this schema is loosely based off [JSON Schema](https://json-schema.org/). Fields marked with a * are required

    export const SCHEMA = {
      type: <COMPONENT_NAME>,
      gridOptions: { *h: int, *w: int, minW: int, minH: int, maxW: int, maxW: int },
      *title: "some title to display in the editor",
      *desc: "A description of the component to display in the editor",
      props: {
        <parameter_name>: {
            *type: <TYPE>,
            *name: string,
            *value: <value of type TYPE>
        }
      }
    };
    
`COMPONENT_NAME` should be the name of the component also exported from that file which in turn should be the name of the JSX file.

`TYPE` can be any of the following primitives:

 - String
 - StringArea
 - RichText 
    - initial `value` prop must be `null`. Use a RichTextDisplay to display the content.
 - Int
 - Number
 - Boolean

 In addition to primitives it can also be "Array" which will allow the components to support arbitrary numbers of parameters.

**`name` must be unique for each prop parameter**

#### Array
    props: {
        <parameter_name>: {
            type: "Array",
            items: {
                type: *<TYPE>,
                name: *string,
                value: *<value of type TYPE>
                desc: string,
            }
        }
      }
      
The `props` are what get displayed in the editor window for the user to make edits to.

## Drag and Drop
if order for the component to interact with the drag and drop interface it must have the following:

 - The root HTML tag must be a DIV
 - The root tag must apply all props ex: `<div {...this.props}`
 - The root tag must render children (if you want the resize handle) ex: `{this.props.children}`

## Styling
Each component should have its own `.scss` file that it gets styling from. The class names should be very specific to
avoid any cross styling conflicts. Something like '<component_name>-main-background' should be good.

# Component Index
In order for the layout engine to be aware of all the avalable components they must each be added to the `EDITOR_CONSTANTS.js`
file. This is where the Editor pulls all the available components from.
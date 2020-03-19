# Editor Conventions
The Editor will likely be one of the more complicated sections for the frontend of this project, as such I will provide
some instructions here for myself and others.

# Layout Engine
The Editor.js file is intended to control dragging and dropping of react components into a nice layout.
It also allows the user to interface with each component's data schema to manipulate page contents. Finally, it handles
the layout and component serialization / deserialization.

# Components
Each component should have its own folder with at least 2 files in it, a `.jsx` file and the `.scss` companion file. 

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
            schema: {
                type: *<TYPE>,
                name: *string,
                value: *<value of type TYPE>
                desc: string,
            },
            value: []
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

# Component Backlog
 <!-- red - #f03c15
 yellow - #ffff00 
 green - #c5f015 -->
#### ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) Easy
Should take <1h if familiar with React. A good place to start and learn.

#### ![#ffff00](https://placehold.it/15/ffff00/000000?text=+) Medium
More difficult and will probably take a couple hours. Difficulty could either be because it is a complicated
component or if it requires more then basic CSS styling.

#### ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) Hard
Requires either good knowledge of React, extensive CSS implementations or both.

 
|Component                      | Difficulty        | Assigned to       | Status            |
|-------------------------------|-------------------|-------------------|-------------------|
|Card (bootstrap style)         |easy               |Ian                |in progress        |
|Raw HTML                       |medium             |none               |pending            |
|Forms                          |hard               |none               |pending            |
|Image                          |easy               |none               |not yet supported  |
|Image with Text Overlay        |medium             |none               |not yet supported  |
|Nav-Bar                        |hard               |none               |not yet supported  |
|Table                          |easy               |Nathan             |not yet supported  |

# Future Editor Features

|Feature                        | Difficulty        | Assigned to       | Status        |
|-------------------------------|-------------------|-------------------|---------------|
|Variable length props          |hard               |Nathan             |in progress    |
|Rich text editor UI controls   |hard               |none               |pending        |
|Image prop type                |medium             |Nathan             |pending        |
|Delete components              |medium             |none               |pending        |

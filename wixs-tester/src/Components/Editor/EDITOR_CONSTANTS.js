import {SCHEMA as TextboxSchema} from "./Components/textbox/textbox";
import {SCHEMA as RichTexboxSchema} from "./Components/richTextbox/RichTextBox";
import {SCHEMA as ContentWithHeaderSchema} from "./Components/ContentWithHeader/ContentWithHeader";
import {SCHEMA as StandardButtonSchema} from "./Components/StandardButton/StandardButton";
import {SCHEMA as RawHTMLBoxSchema} from "./Components/RawHTMLBox/RawHTMLBox";
import {SCHEMA as TableSchema} from "./Components/Table/EditorTable";
import {SCHEMA as registerformSchema} from "./Components/RegisterForm/registerform";
import {SCHEMA as HeaderSchema} from "./Components/Header/Header";
import {SCHEMA as FooterSchema} from "./Components/Footer/Footer";


export const LEGEND = {
  Textbox: TextboxSchema,
  RichTextbox: RichTexboxSchema,
  ContentWithHeader: ContentWithHeaderSchema,
  StandardButton: StandardButtonSchema,
  RawHTMLBox: RawHTMLBoxSchema,
  Table: TableSchema,
  registerform: registerformSchema,
  Header: HeaderSchema,
  Footer: FooterSchema
};
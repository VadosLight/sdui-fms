import { ButtonView } from "../../components/ButtonView/ButtonView";
import { TextFieldView } from "../../components/TextFieldView/TextFieldView";
import { LayoutElementContent } from "./LayoutElementContent";

export type ComponentName = "ButtonView" | "TextFieldView";

type LayoutElementBase = {
  id?: string;
  visible?: boolean;
};

type NamedLayoutElement<
  Type extends ComponentName,
  Content extends LayoutElementContent
> = LayoutElementBase & { type: Type; content: Content };

export type LayoutElement =
  | NamedLayoutElement<"ButtonView", ButtonView>
  | NamedLayoutElement<"TextFieldView", TextFieldView>;

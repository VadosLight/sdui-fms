import { BannerWrapper } from "../../components/BannerWrapper/BannerWrapper";
import { ButtonView } from "../../components/ButtonView/ButtonView";
import { TextFieldView } from "../../components/TextFieldView/TextFieldView";
import { SpacingView } from "../../components/SpacingView/SpacingView";
import { TextLabel } from "../../components/TextLabel/TextLabel";
import { ImageView } from "../../components/ImageView/ImageView";
import { StackWrapper } from "../../components/StackWrapper/StackWrapper";
import { LayoutElementContent } from "./LayoutElementContent";

export type ComponentName =
  | "ButtonView"
  | "TextFieldView"
  | "BannerWrapper"
  | "SpacingView"
  | "ImageView"
  | "TextLabel"
  | "StackWrapper";

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
  | NamedLayoutElement<"BannerWrapper", BannerWrapper>
  | NamedLayoutElement<"TextLabel", TextLabel>
  | NamedLayoutElement<"SpacingView", SpacingView>
  | NamedLayoutElement<"ImageView", ImageView>
  | NamedLayoutElement<"TextFieldView", TextFieldView>
  | NamedLayoutElement<"StackWrapper", StackWrapper>;

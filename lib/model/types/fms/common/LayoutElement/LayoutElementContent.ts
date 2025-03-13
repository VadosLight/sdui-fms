import { BannerWrapper } from "../../components/BannerWrapper/BannerWrapper";
import { ButtonView } from "../../components/ButtonView/ButtonView";
import { TextFieldView } from "../../components/TextFieldView/TextFieldView";
import { TextLabel } from "../../components/TextLabel/TextLabel";
import { SpacingView } from "../../components/SpacingView/SpacingView";
import { ImageView } from "../../components/ImageView/ImageView";
import { StackWrapper } from "../../components/StackWrapper/StackWrapper";

export type LayoutElementContent =
  | ButtonView
  | TextFieldView
  | BannerWrapper
  | SpacingView
  | ImageView
  | TextLabel
  | StackWrapper;

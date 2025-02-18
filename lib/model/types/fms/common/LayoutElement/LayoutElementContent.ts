import { BannerWrapper } from "../../components/BannerWrapper/BannerWrapper";
import { ButtonView } from "../../components/ButtonView/ButtonView";
import { TextFieldView } from "../../components/TextFieldView/TextFieldView";
import { TextLabel } from "../../components/TextLabel/TextLabel";
import { SpacingView } from "../../components/SpacingView/SpacingView";

export type LayoutElementContent =
  | ButtonView
  | TextFieldView
  | BannerWrapper
  | SpacingView
  | TextLabel;

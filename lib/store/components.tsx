import { deepMap } from "nanostores";
import { DEFAULT_DS } from "../utils/constants/defaults";
import { ButtonView } from "@components/ButtonView/ButtonView";
import React from "react";
import { ComponentProps } from "@model/types/utils/ComponentProps";
import { TextFieldView } from "@components/TextFieldView/TextFieldView";
import { ComponentName } from "@model/types/fms/common/LayoutElement/LayoutElement";
import { BannerWrapper } from "@components/BannerWrapper/BannerWrapper";
import { TextLabel } from "@components/TextLabel/TextLabel";
import { SpacingView } from "@components/SpacingView/SpacingView";
import { ImageView } from "@components/ImageView/ImageView";

type Element<T extends ComponentName> = React.ElementType<ComponentProps<T>>;

type DesignSystemComponents = {
  ButtonView: Element<"ButtonView">;
  BannerWrapper: Element<"BannerWrapper">;
  TextLabel: Element<"TextLabel">;
  TextFieldView: Element<"TextFieldView">;
  SpacingView: Element<"SpacingView">;
  ImageView: Element<"ImageView">;
};

type RegisteredComponents = Record<string, DesignSystemComponents>;

export const $components = deepMap<RegisteredComponents>({
  [DEFAULT_DS]: {
    ButtonView: ButtonView,
    TextFieldView: TextFieldView,
    BannerWrapper: BannerWrapper,
    TextLabel: TextLabel,
    ImageView: ImageView,
    SpacingView: SpacingView,
  },
});

export const registerDesignSystem = (
  dsName: string,
  components: DesignSystemComponents
) => {
  $components.setKey(dsName, components);
};

registerDesignSystem("PWA", {
  ButtonView: ButtonView,
  TextFieldView: TextFieldView,
  BannerWrapper: BannerWrapper,
  TextLabel: TextLabel,
  SpacingView: SpacingView,
  ImageView: ImageView,
});

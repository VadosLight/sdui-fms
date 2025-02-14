import { map } from "nanostores";
import { DEFAULT_DS } from "../utils/constants/defaults";
import { ButtonView } from "@components/ButtonView/ButtonView";
import React from "react";
import { ComponentProps } from "@model/types/utils/ComponentProps";
import { TextFieldView } from "@components/TextFieldView/TextFieldView";
import { ComponentName } from "@model/types/fms/common/LayoutElement/LayoutElement";

type Element<T extends ComponentName> = React.ElementType<ComponentProps<T>>;

type DesignSystemComponents = {
  ButtonView: Element<"ButtonView">;
  TextFieldView: Element<"TextFieldView">;
};

type RegisteredComponents = Record<string, DesignSystemComponents>;

export const $components = map<RegisteredComponents>({
  [DEFAULT_DS]: {
    ButtonView: (props) => <ButtonView {...props} />,
    TextFieldView: TextFieldView,
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
});

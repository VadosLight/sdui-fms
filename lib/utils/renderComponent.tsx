import { ButtonView } from "@components/ButtonView/ButtonView";
import { LayoutElement } from "@model/types/fms/common/LayoutElement/LayoutElement";

export const renderComponent = (element: LayoutElement, ds: string = "AIO") => {
  switch (element.type) {
    case "ButtonView":
      return <ButtonView key={element.id} {...element} />;
    // case "TextFieldView":
    //   return <TextFieldView key={element.id} {...element} />;
    default: {
      console.error(
        `Component ${element.type} is not registered in the design system ${ds} `
      );
      return null;
    }
  }
};

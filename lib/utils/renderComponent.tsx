import { BannerWrapper } from "@components/BannerWrapper/BannerWrapper";
import { ButtonView } from "@components/ButtonView/ButtonView";
import { TextFieldView } from "@components/TextFieldView/TextFieldView";
import { LayoutElement } from "@model/types/fms/common/LayoutElement/LayoutElement";

export const renderComponent = (element: LayoutElement, ds: string = "AIO") => {
  switch (element.type) {
    case "ButtonView":
      return <ButtonView key={element.id} {...element} />;
    case "TextFieldView":
      return <TextFieldView key={element.id} {...element} />;
    case "BannerWrapper":
      return <BannerWrapper key={element.id} {...element} />;
    default: {
      console.error(
        // @ts-expect-error на случай, если придет шаблон новой версии, а либу еще не обновили
        `Component ${element.type} is not registered in the design system ${ds} `
      );
      return null;
    }
  }
};

import { BannerWrapper } from "@components/BannerWrapper/BannerWrapper";
import { ButtonView } from "@components/ButtonView/ButtonView";
import { TextFieldView } from "@components/TextFieldView/TextFieldView";
import {
  ComponentName,
  LayoutElement,
} from "@model/types/fms/common/LayoutElement/LayoutElement";
import { DEFAULT_DS } from "./constants/defaults";
import { TextLabel } from "@components/TextLabel/TextLabel";

export type RenderComponentOptions = {
  designSystem?: string;
  editMode?: boolean;
  onComponentDrop?: (elementType: ComponentName, id: string) => void;
};

export const renderComponent = (
  element: LayoutElement,
  options?: RenderComponentOptions
) => {
  const {
    designSystem = DEFAULT_DS,
    editMode = false,
    onComponentDrop,
  } = options || {};

  switch (element.type) {
    case "ButtonView":
      return <ButtonView key={element.id} {...element} editMode={editMode} />;
    case "TextFieldView":
      return (
        <TextFieldView key={element.id} {...element} editMode={editMode} />
      );
    case "BannerWrapper":
      return (
        <BannerWrapper
          key={element.id}
          {...element}
          editMode={editMode}
          onDrop={onComponentDrop}
        />
      );
    case "TextLabel":
      return <TextLabel key={element.id} {...element} editMode={editMode} />;
    default: {
      console.error(
        // @ts-expect-error на случай, если придет шаблон новой версии, а либу еще не обновили
        `Component ${element.type} is not registered in the design system ${designSystem} `
      );
      return null;
    }
  }
};

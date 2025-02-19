import { BannerWrapper } from "@components/BannerWrapper/BannerWrapper";
import { ButtonView } from "@components/ButtonView/ButtonView";
import { TextFieldView } from "@components/TextFieldView/TextFieldView";
import { SpacingView } from "@components/SpacingView/SpacingView";
import { LayoutElement } from "@model/types/fms/common/LayoutElement/LayoutElement";
import { DEFAULT_DS } from "./constants/defaults";
import { TextLabel } from "@components/TextLabel/TextLabel";
import { Highlighted } from "@components/HOCs/Highlighted/Highlighted";
import { BuilderSpecific } from "@model/types/utils/ComponentProps";

export type RenderComponentOptions = {
  designSystem?: string;
} & BuilderSpecific;

export const renderComponent = (
  element: LayoutElement,
  options?: RenderComponentOptions
) => {
  const {
    designSystem = DEFAULT_DS,
    _editMode = false,
    _onDrop,
    _onRightClick,
  } = options || {};

  switch (element.type) {
    case "ButtonView":
      return (
        <ButtonView
          key={element.id}
          {...element}
          _editMode={_editMode}
          _onRightClick={_onRightClick}
        />
      );
    case "TextFieldView":
      return (
        <TextFieldView
          key={element.id}
          {...element}
          _editMode={_editMode}
          _onRightClick={_onRightClick}
        />
      );
    case "BannerWrapper":
      return (
        <BannerWrapper
          key={element.id}
          {...element}
          _editMode={_editMode}
          _onDrop={_onDrop}
          _onRightClick={_onRightClick}
        />
      );
    case "TextLabel":
      return (
        <TextLabel
          key={element.id}
          {...element}
          _editMode={_editMode}
          _onRightClick={_onRightClick}
        />
      );
    case "SpacingView":
      return (
        <Highlighted
          _editMode={_editMode}
          _onDrop={_onDrop}
          _onRightClick={_onRightClick}
        >
          <SpacingView
            key={element.id}
            {...element}
            _editMode={_editMode}
            _onRightClick={_onRightClick}
          />
        </Highlighted>
      );
    default: {
      console.error(
        // @ts-expect-error на случай, если придет шаблон новой версии, а либу еще не обновили
        `Component ${element.type} is not registered in the design system ${designSystem} `
      );
      return null;
    }
  }
};

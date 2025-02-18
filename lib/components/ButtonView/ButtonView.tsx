import { ComponentProps } from "@model/types/utils/ComponentProps";
import { ButtonMobile } from "@alfalab/core-components/button/mobile";

export const ButtonView = (props: ComponentProps<"ButtonView">) => {
  const { content, id, type, _onRightClick } = props;
  const { text } = content;

  return (
    <ButtonMobile
      block
      onContextMenu={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (id && _onRightClick) {
          _onRightClick(e, type, id);
        }
      }}
    >
      {text}
    </ButtonMobile>
  );
};

import { ComponentProps } from "@model/types/utils/ComponentProps";
import { InputMobile } from "@alfalab/core-components/input/mobile";

export const TextFieldView = (props: ComponentProps<"TextFieldView">) => {
  const { content, id, type, _onRightClick } = props;
  const { text, title } = content;

  return (
    <InputMobile
      defaultValue={text}
      value={text}
      name={id}
      label={title}
      block
      onChange={() => {}}
      onContextMenu={(e) => {
        if (id && _onRightClick) {
          _onRightClick(e, type, id);
        }
      }}
    ></InputMobile>
  );
};

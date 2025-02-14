import { ComponentProps } from "@model/types/utils/ComponentProps";
import { InputMobile } from "@alfalab/core-components/input/mobile";

export const TextFieldView = (props: ComponentProps<"TextFieldView">) => {
  const { content, id } = props;
  const { text, title } = content;

  return (
    <InputMobile
      defaultValue={text}
      value={text}
      name={id}
      label={title}
      block
      onChange={() => {}}
    ></InputMobile>
  );
};

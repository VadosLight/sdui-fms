import { ComponentProps } from "@model/types/utils/ComponentProps";

export const TextFieldView = (props: ComponentProps<"TextFieldView">) => {
  const { content, id } = props;
  const { text } = content;

  return <input value={text} name={id}></input>;
};

import { ComponentProps } from "@model/types/utils/ComponentProps";

export const TextFieldView = (props: ComponentProps<"TextFieldView">) => {
  const { content, type, id, visible } = props;
  const { text } = content;

  console.log({ content, type, id, visible });

  return <input value={text} name={id}></input>;
};

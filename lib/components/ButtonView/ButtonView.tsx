import { ComponentProps } from "@model/types/utils/ComponentProps";

export const ButtonView = (props: ComponentProps<"ButtonView">) => {
  const { content, type, id, visible } = props;
  const { text } = content;

  console.log({ content, type, id, visible });

  return <button>{text}</button>;
};

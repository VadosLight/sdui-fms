import { ComponentProps } from "@model/types/utils/ComponentProps";
import styles from "./ButtonView.module.css";
import { ButtonMobile } from "@alfalab/core-components/button/mobile";

export const ButtonView = (props: ComponentProps<"ButtonView">) => {
  const { content } = props;
  const { text } = content;

  return <ButtonMobile block>{text}</ButtonMobile>;
};

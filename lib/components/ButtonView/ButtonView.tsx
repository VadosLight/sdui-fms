import { ComponentProps } from "@model/types/utils/ComponentProps";
import styles from "./ButtonView.module.css";

export const ButtonView = (props: ComponentProps<"ButtonView">) => {
  const { content } = props;
  const { text } = content;

  return <button className={styles.button}>{text}</button>;
};

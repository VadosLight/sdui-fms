import { PropsWithChildren } from "react";
import styles from "./Highlighted.module.css";

export const Highlighted = (props: PropsWithChildren) => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};

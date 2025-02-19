import { PropsWithChildren } from "react";
import styles from "./Highlighted.module.css";
import { BuilderSpecific } from "@model/types/utils/ComponentProps";

export const Highlighted = (props: PropsWithChildren<BuilderSpecific>) => {
  const { children, _editMode } = props;

  if (!_editMode) {
    return children;
  }

  return <div className={styles.container}>{children}</div>;
};

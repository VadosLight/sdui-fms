import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import styles from "./SchemaPreview.module.css";
import { Copy } from "lucide-react";

export type SchemaPreviewProps = {
  screen: SDUIScreen;
};

export const SchemaPreview = (props: SchemaPreviewProps) => {
  const { screen } = props;

  const text = JSON.stringify(screen, null, 2);

  return (
    <div className={styles.wrapper}>
      <textarea className={styles.textarea} value={text} />
      <Copy
        className={styles.copy}
        onClick={() => {
          navigator.clipboard.writeText(text);
          alert("SDUI схема скопирована");
        }}
      />
    </div>
  );
};

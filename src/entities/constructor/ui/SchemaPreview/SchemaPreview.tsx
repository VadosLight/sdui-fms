import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import styles from "./SchemaPreview.module.css";
import { Copy } from "lucide-react";
import { DeepReadonly } from "@shared/utils/DeepReadonly";

export type SchemaPreviewProps = {
  screen: DeepReadonly<SDUIScreen>;
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

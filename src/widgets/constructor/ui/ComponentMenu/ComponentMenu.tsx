import {
  ComponentName,
  LayoutElement,
} from "@model/types/fms/common/LayoutElement/LayoutElement";
import classNames from "classnames";
import styles from "./ComponentMenu.module.css";
import { DeleteIcon, SidebarClose } from "lucide-react";
import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { SpacingViewFrom } from "@features/constructor/ui/SpacingViewFrom/SpacingViewFrom";
import { useState } from "react";

export type ComponentMenuProps = {
  screen: SDUIScreen;
  id?: string;
  type?: ComponentName;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newElement: LayoutElement) => void;
  onRemoveElement: (id: string) => void;
};

export const ComponentMenu = (props: ComponentMenuProps) => {
  const { id, isOpen, onClose, onSubmit, type, screen, onRemoveElement } =
    props;

  const [newComponent, setNewComponent] = useState<LayoutElement>(
    {} as LayoutElement
  );

  const handleSubmit = () => {
    if (!newComponent) {
      return;
    }
    // const oldId = id
    onSubmit(newComponent);
  };

  if (!id) {
    return <></>;
  }

  return (
    <aside
      className={classNames(styles.menu, { [styles.menuOpen]: id && isOpen })}
    >
      <div className={styles.title}>
        <SidebarClose onClick={onClose} className={styles.btnClose} />
        <h3>{type}</h3>
        <p>{id}</p>
        <DeleteIcon onClick={() => onRemoveElement(id)} />
      </div>

      <div className={styles.main}>
        {type === "SpacingView" && (
          <SpacingViewFrom
            screen={screen}
            id={id}
            setNewComponent={setNewComponent}
          />
        )}
      </div>

      <div className={styles.buttons}>
        <ButtonMobile onClick={handleSubmit} disabled={!newComponent}>
          Подтвердить
        </ButtonMobile>
        <ButtonMobile onClick={onClose}>Отмена</ButtonMobile>
      </div>
    </aside>
  );
};

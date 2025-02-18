import { ComponentName } from "@model/types/fms/common/LayoutElement/LayoutElement";
import classNames from "classnames";
import styles from "./ComponentMenu.module.css";
import { SidebarClose } from "lucide-react";
import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { SpacingViewFrom } from "@features/constructor/ui/SpacingViewFrom/SpacingViewFrom";

export type ComponentMenuProps = {
  screen: SDUIScreen;
  id?: string;
  type?: ComponentName;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const ComponentMenu = (props: ComponentMenuProps) => {
  const { id, isOpen, onClose, onSubmit, type, screen } = props;

  const handleSubmit = () => {
    // const oldId = id
    onSubmit();
  };

  return (
    <aside
      className={classNames(styles.menu, { [styles.menuOpen]: id && isOpen })}
    >
      <div className={styles.title}>
        <SidebarClose onClick={onClose} className={styles.btnClose} />
        <h3>{type}</h3>
        <p>{id}</p>
      </div>

      <div className={styles.main}>
        {type === "SpacingView" && <SpacingViewFrom screen={screen} id={id} />}
      </div>

      <div className={styles.buttons}>
        <ButtonMobile onClick={handleSubmit}>Подтвердить</ButtonMobile>
        <ButtonMobile onClick={onClose}>Отмена</ButtonMobile>
      </div>
    </aside>
  );
};

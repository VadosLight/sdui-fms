import { Suspense } from "react";
import { DEFAULT_DS } from "../../utils/constants/defaults";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import {
  renderComponent,
  RenderComponentOptions,
} from "../../utils/renderComponent";
import styles from "./BaseScreen.module.css";
import { DeepReadonly } from "@shared/utils/DeepReadonly";

export type BaseScreenProps = {
  screen: DeepReadonly<SDUIScreen>;
} & RenderComponentOptions;

export const BaseScreen = (props: BaseScreenProps) => {
  const {
    designSystem = DEFAULT_DS,
    screen,
    _editMode,
    _onDrop,
    _onRightClick,
  } = props;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.baseScreenContainer}>
        <header className={styles.header}>Header</header>

        <main className={styles.mainContent}>
          {screen?.content.type === "list" &&
            screen.content.items.map((element) => {
              return renderComponent(element, {
                designSystem,
                _editMode,
                _onDrop,
                _onRightClick,
              });
            })}
        </main>

        <footer className={styles.footer}>Footer</footer>
      </div>
    </Suspense>
  );
};

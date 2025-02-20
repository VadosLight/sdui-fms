import { ComponentName } from "@model/types/fms/common/LayoutElement/LayoutElement";
import { useStore } from "@nanostores/react";
import { $components } from "@store/components";
import { useDrag } from "react-dnd";
import { DEFAULT_DS } from "../../../../../lib/utils/constants/defaults";
import { getDefaultsByType } from "@widgets/constructor/lib/getDefaultsByType";
import styles from "./ComponentsShowcase.module.css";

export const ComponentsShowcase = () => {
  const registeredComponents = useStore($components);
  const componentList = Object.entries(registeredComponents[DEFAULT_DS]);

  return (
    <aside className={styles.wrapper}>
      <h2 className={styles.header}>Набор компонентов</h2>
      {componentList.map(([type, Component]) => {
        const props = getDefaultsByType(type as ComponentName);

        if (!props) {
          return <></>;
        }

        return (
          <div key={type}>
            <h3>{type}</h3>
            <DraggableComponent
              // @ts-expect-error любой зарегистрированный компонент
              children={<Component {...props} />}
              type={type as ComponentName}
              key={type}
            />
          </div>
        );
      })}
    </aside>
  );
};

const DraggableComponent = ({
  type,
  children,
}: {
  type: ComponentName;
  children: React.ReactElement;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "COMPONENT",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return drag(
    <div
      style={{
        padding: "16px",
        borderRadius: "16px",
        marginBottom: "4px",
        backgroundColor: isDragging ? "#00005540" : undefined,
        cursor: "grab",
        border: "1px solid rgba(0, 0, 0, 0.33)",
        margin: 8,
      }}
    >
      {children}
    </div>
  );
};

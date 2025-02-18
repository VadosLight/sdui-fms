import {
  ComponentName,
  LayoutElement,
} from "@model/types/fms/common/LayoutElement/LayoutElement";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { BaseScreen } from "@screen/BaseScreen/BaseScreen";
import { generateId } from "@widgets/Constructor/lib/generateId";
import { getDefaultsByType } from "@widgets/Constructor/lib/getDefaultsByType";
import { updateComponentContent } from "@widgets/Constructor/lib/updateComponentContent";
import { useDrop } from "react-dnd/dist/hooks/useDrop/useDrop";
import { ComponentMenu } from "../ComponentMenu/ComponentMenu";
import { useComponentMenu } from "@widgets/Constructor/hooks/useComponentMenu";

export const DropZone = ({
  screen,
  updateScreen,
}: {
  screen: SDUIScreen;
  updateScreen: React.Dispatch<React.SetStateAction<SDUIScreen>>;
}) => {
  const { isMenuOpen, setIsMenuOpen, component, setComponent } =
    useComponentMenu();
  const handleDrop = (path: string, item: LayoutElement) => {
    const newComponent = getDefaultsByType(item.type as ComponentName);
    if (!newComponent) return;

    const newELement = {
      id: generateId(),
      visible: true,
      ...newComponent,
    };

    updateScreen((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        items: [...prev.content.items, newELement],
      },
    }));
  };

  const handleComponentDrop = (elementType: ComponentName, id: string) => {
    updateScreen((prev) => {
      const newScreen = prev;

      if (Array.isArray(newScreen.content.items)) {
        newScreen.content.items = updateComponentContent(
          newScreen.content.items,
          id,
          elementType
        );
      }

      return newScreen;
    });
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    elementType: ComponentName,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(true);
    setComponent({ id, type: elementType });
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      handleDrop("content.items", item as LayoutElement);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <>
      <ComponentMenu
        id={component?.id}
        type={component?.type}
        isOpen={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
        }}
        onSubmit={function (): void {
          setIsMenuOpen(false);
        }}
      />
      {drop(
        <div
          style={{
            flex: 1,
            height: "100%",
            background: isOver ? "#00550030" : "white",
            overflowY: "auto",
          }}
        >
          <BaseScreen
            screen={screen}
            editMode
            onComponentDrop={handleComponentDrop}
            onComponentRightClick={handleRightClick}
          />
        </div>
      )}
    </>
  );
};

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

export const DropZone = ({
  screen,
  updateScreen,
}: {
  screen: SDUIScreen;
  updateScreen: (s: SDUIScreen) => void;
}) => {
  const handleDrop = (path: string, item: LayoutElement) => {
    const newComponent = getDefaultsByType(item.type as ComponentName);
    if (!newComponent) return;

    const newScreen = { ...screen };
    newScreen.content.items.push({
      id: generateId(),
      visible: true,
      ...newComponent,
    });

    updateScreen(newScreen);
  };

  const handleComponentDrop = (elementType: ComponentName, id: string) => {
    const newScreen = structuredClone(screen);

    if (Array.isArray(newScreen.content.items)) {
      newScreen.content.items = updateComponentContent(
        newScreen.content.items,
        id,
        elementType
      );
    }

    updateScreen(newScreen);
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    elementType: ComponentName,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    alert(
      `Правый клик на ${id} => ${elementType} открывает модалку с настройками конкретного компонента`
    );
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

  return drop(
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
  );
};

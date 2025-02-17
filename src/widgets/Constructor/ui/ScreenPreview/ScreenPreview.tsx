import {
  ComponentName,
  LayoutElement,
} from "@model/types/fms/common/LayoutElement/LayoutElement";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { BaseScreen } from "@screen/BaseScreen/BaseScreen";
import { generateId } from "@widgets/Constructor/lib/generateId";
import { getDefaultsByType } from "@widgets/Constructor/lib/getDefaultsByType";
import { useDrop } from "react-dnd/dist/hooks/useDrop/useDrop";

export const DropZone = ({
  screen,
  updateScreen,
}: {
  screen: SDUIScreen;
  updateScreen: (s: SDUIScreen) => void;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDrop = (path: string, item: any) => {
    const newComponent = getDefaultsByType(item.type as ComponentName);
    if (!newComponent) return;

    const newScreen = { ...screen };

    // Добавляем компонент в screen.content.items
    newScreen.content.items.push({
      id: generateId(),
      visible: true,
      ...newComponent,
    });

    updateScreen(newScreen);
  };

  const handleComponentDrop = (elementType: ComponentName, id: string) => {
    console.log({ id, elementType });
    const newContentValues = getDefaultsByType(elementType);
    if (!newContentValues) return;

    const newScreen = { ...screen };

    // Функция для прохода по первому массиву items
    const updateComponentContent = (
      items: LayoutElement[]
    ): LayoutElement[] => {
      const recursiveItemReplace = (element: LayoutElement): LayoutElement => {
        if (element.id !== id) {
          // если у дочернего элемента есть children
          // @ts-expect-error можно починить тип с помощью "element.type === 'BannerWrapper' &&" но надо будет делать для всех компонентов с детьми
          if (element.content.content) {
            return {
              ...element,
              content: {
                ...element.content,
                // @ts-expect-error тоже самое "element.type === 'BannerWrapper' &&"
                content: { ...recursiveItemReplace(element.content.content) },
              },
            };
          }

          return element;
        }

        return {
          ...element,
          id: generateId(),
          content: {
            // @ts-expect-error тоже самое "element.type === 'BannerWrapper' &&"
            content: { id: generateId(), ...newContentValues },
          },
        };
      };

      // @ts-expect-error тоже самое
      return items.map((item) => {
        if (item.id === id) {
          // Проверяем, содержит ли content вложенный контент
          if (
            "content" in item.content &&
            typeof item.content.content === "object"
          ) {
            return {
              ...item,
              content: {
                ...item.content,
                content: {
                  id: generateId(),
                  type: elementType,
                  content: { ...newContentValues.content },
                },
              },
            };
          }
          // Для обычных компонентов обновляем content как раньше
          return {
            ...item,
            content: { ...item.content, ...newContentValues.content },
            id: generateId(),
          };
        }

        return recursiveItemReplace(item);
      });
    };

    if (Array.isArray(newScreen.content.items)) {
      newScreen.content.items = updateComponentContent(newScreen.content.items);
    }

    updateScreen(newScreen);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item, monitor) => {
      if (monitor.didDrop()) {
        return;
      }

      handleDrop("content.items", item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return drop(
    <div
      style={{
        flex: 1,
        height: "100%",
        background: isOver ? "#050" : "white",
        overflowY: "auto",
      }}
    >
      <BaseScreen
        screen={screen}
        editMode
        onComponentDrop={handleComponentDrop}
      />
    </div>
  );
};

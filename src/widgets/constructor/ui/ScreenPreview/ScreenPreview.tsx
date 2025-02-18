import {
  ComponentName,
  LayoutElement,
} from "@model/types/fms/common/LayoutElement/LayoutElement";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { BaseScreen } from "@screen/BaseScreen/BaseScreen";
import { generateId } from "@widgets/constructor/lib/generateId";
import { getDefaultsByType } from "@widgets/constructor/lib/getDefaultsByType";
import { updateComponentContent } from "@widgets/constructor/lib/updateComponentContent";
import { useDrop } from "react-dnd/dist/hooks/useDrop/useDrop";
import { ComponentMenu } from "../ComponentMenu/ComponentMenu";
import { useComponentMenu } from "@widgets/constructor/hooks/useComponentMenu";

const addElementToContentItems = (
  prev: SDUIScreen,
  newValue: LayoutElement
): SDUIScreen => {
  const newELement = {
    id: generateId(),
    visible: true,
    ...newValue,
  };

  return {
    ...prev,
    content: {
      ...prev.content,
      items: [...prev.content.items, newELement],
    },
  };
};

// const removeElementFromContentItems = (prev: SDUIScreen, idToRemove: string): SDUIScreen => {
//   return {
//     ...prev,
//     content: {
//       ...prev.content,
//       items: prev.content.items.filter((el) => el.id === idToRemove)
//     }
//   }
// }

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

    updateScreen((prev) => addElementToContentItems(prev, newComponent));
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

  const handleReplaceItemById = (oldId: string, newElement: LayoutElement) => {
    const replaceElement = (items: LayoutElement[]): LayoutElement[] => {
      return items.map((item) => {
        if (item.id === oldId) {
          return { ...newElement };
        } else if (Array.isArray(item.items)) {
          return { ...item, items: replaceElement(item.items) }; // Рекурсивно ищем внутри массива
        } else if (typeof item === "object" && item !== null) {
          return Object.keys(item).reduce((acc, key) => {
            acc[key] =
              key === "items" && Array.isArray(item[key])
                ? replaceElement(item[key]) // Рекурсивно ищем в объекте
                : item[key];
            return acc;
          }, {} as any);
        }
        return item;
      });
    };

    updateScreen((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        items: replaceElement(prev.content.items),
      },
    }));
  };

  const handleRemoveItemById = (idToRemove: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const removeElement = (items: any[]): any[] => {
      return items
        .filter((item) => item.id !== idToRemove) // Убираем элемент, если id совпадает
        .map((item) => {
          if (Array.isArray(item.items)) {
            return { ...item, items: removeElement(item.items) }; // Рекурсивно ищем в массиве
          } else if (typeof item === "object" && item !== null) {
            return Object.keys(item).reduce((acc, key) => {
              acc[key] =
                key === "items" && Array.isArray(item[key])
                  ? removeElement(item[key]) // Рекурсивно ищем в объекте
                  : item[key];
              return acc;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }, {} as any);
          }
          return item;
        });
    };

    updateScreen((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        items: removeElement(prev.content.items),
      },
    }));
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
        screen={screen}
        id={component?.id}
        type={component?.type}
        isOpen={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
        }}
        onRemoveElement={handleRemoveItemById}
        onSubmit={(newElement) => {
          const oldId = component?.id || "";
          handleReplaceItemById(oldId, newElement);

          console.log({ newElement, oldId });
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
            _editMode
            _onDrop={handleComponentDrop}
            _onRightClick={handleRightClick}
          />
        </div>
      )}
    </>
  );
};

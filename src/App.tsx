import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { BaseScreen } from "@screen/BaseScreen/BaseScreen";
import { useState } from "react";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { useStore } from "@nanostores/react";
import { $components } from "@store/components";
import { DEFAULT_DS } from "../lib/utils/constants/defaults";
import {
  ComponentName,
  LayoutElement,
} from "@model/types/fms/common/LayoutElement/LayoutElement";
import { ComponentProps } from "@model/types/utils/ComponentProps";
import { DndProvider } from "react-dnd/dist/core/DndProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import { customAlphabet } from "nanoid";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
});

const getDefaultsByType = (type: ComponentName) => {
  switch (type) {
    case "ButtonView":
      return {
        type: "ButtonView",
        content: { enabled: true, size: "large", text: "Просто кнопка" },
      } as ComponentProps<"ButtonView">;
    case "BannerWrapper":
      return {
        type: "BannerWrapper",
        content: {
          padding: 16,
          content: {
            type: "ButtonView",

            content: {
              text: "Кнопка внутри баннера",
            },
          },
        },
      } as ComponentProps<"BannerWrapper">;
    case "TextFieldView":
      return {
        type: "TextFieldView",
        content: {
          text: "Текст из TextFieldView",
          title: "Подпись к полю",
          placeholder: "Плейсхолдер",
        },
      } as ComponentProps<"TextFieldView">;
  }

  return undefined;
};

const ComponentsShowcase = () => {
  const registeredComponents = useStore($components);
  const componentList = Object.entries(registeredComponents[DEFAULT_DS]);

  return (
    <aside
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        backgroundColor: "white",
        padding: 16,
        height: "100%",
      }}
    >
      <h2 style={{ color: "black" }}>Набор компонентов</h2>
      {componentList.map(([type, Component]) => {
        const props = getDefaultsByType(type as ComponentName);

        if (!props) {
          return <></>;
        }

        return (
          <DraggableComponent
            // @ts-expect-error любой зарегистрированный компонент
            children={<Component {...props} />}
            type={type as ComponentName}
            key={type}
          />
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

/** Используем для генерации базового айдишника компонента */
const nanoid = customAlphabet("1234567890abcdef", 10);

const DropZone = ({
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
      id: nanoid(),
      visible: true,
      ...newComponent,
    });

    updateScreen(newScreen);
  };

  const handleComponentDrop = (elementType: ComponentName, id: string) => {
    console.log({ id, elementType });
    const newContentValues = getDefaultsByType(elementType)?.content;
    if (!newContentValues) return;

    const newScreen = { ...screen };

    // Функция для прохода по первому массиву items
    const updateComponentContent = (
      items: LayoutElement[]
    ): LayoutElement[] => {
      const recursiveItemReplace = (element: LayoutElement): LayoutElement => {
        console.log("recursiveItemReplace", { id, element, newContentValues });

        if (element.id !== id) {
          // если у дочернего элемента есть children
          if (element.content.content) {
            return {
              ...element,
              content: {
                ...element.content,
                content: { ...recursiveItemReplace(element.content.content) },
              },
            };
          }

          return element;
        }

        return {
          ...element,
          content: {
            content: {
              ...newContentValues,
            },
          },
        };

        // if (element.id === id) {
        //   if ("content" in element && typeof element.content === "object") {
        //     return {
        //       ...element,
        //       content: {
        //         id: nanoid(),
        //         type: elementType,
        //         content: {
        //           ...element.content,
        //           content: { ...newContentValues },
        //         },
        //       },
        //     };
        //   }

        //   console.log("recursiveItemReplace-2", { id });

        //   return {
        //     ...element,
        //     content: { ...element.content, ...newContentValues },
        //     id: nanoid(),
        //   };
        // }

        // // Если у элемента есть `content`, рекурсивно обрабатываем его
        // if ("content" in element && typeof element.content === "object") {
        //   console.log({ element });
        //   return {
        //     ...element,
        //     content: recursiveItemReplace(element.content),
        //   };
        // }
      };

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
                  id: nanoid(),
                  type: elementType,
                  content: { ...newContentValues },
                },
              },
            };
          }
          // Для обычных компонентов обновляем content как раньше
          return {
            ...item,
            content: { ...item.content, ...newContentValues },
            id: nanoid(),
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

function App() {
  const [screen, updateScreen] = useState<SDUIScreen>({
    content: { type: "list", items: [] },
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        {/* <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            height: "100dvh",
            gap: 24,
            padding: 32,
            boxSizing: "border-box",
          }}
        > */}
        <PanelGroup
          direction="horizontal"
          autoSaveId={"sdui"}
          style={{
            height: "100dvh",
            padding: 32,
            boxSizing: "border-box",
            gap: 4,
          }}
        >
          <Panel defaultSize={30} minSize={20}>
            <ComponentsShowcase />
          </Panel>
          <PanelResizeHandle />

          {/* <BaseScreen designSystem="AIO" screen={screen} /> */}
          <Panel defaultSize={30} minSize={20}>
            <DropZone screen={screen} updateScreen={updateScreen} />
          </Panel>
          <PanelResizeHandle />

          <Panel minSize={20}>
            <textarea
              value={JSON.stringify(screen, null, 2)}
              style={{ width: "100%", height: "100%", resize: "none" }}
            ></textarea>
          </Panel>
        </PanelGroup>
        {/* </div> */}
      </QueryClientProvider>
    </DndProvider>
  );
}

export default App;

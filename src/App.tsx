import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { BaseScreen } from "@screen/BaseScreen/BaseScreen";
import { useState } from "react";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { useStore } from "@nanostores/react";
import { $components } from "@store/components";
import { DEFAULT_DS } from "../lib/utils/constants/defaults";
import { ComponentName } from "@model/types/fms/common/LayoutElement/LayoutElement";
import { ComponentProps } from "@model/types/utils/ComponentProps";
import { DndProvider } from "react-dnd/dist/core/DndProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import { customAlphabet } from "nanoid";

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
          content: {
            type: "ButtonView",
            content: {
              text: "Кнопка внутри баннера, надо вместо неё сделать дропзону",
            },
          },
        },
      } as ComponentProps<"BannerWrapper">;
    case "TextFieldView":
      return {
        type: "TextFieldView",
        content: {
          text: "TextFieldView",
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
      }}
    >
      <h2 style={{ color: "black" }}>Набор компонентов</h2>
      {componentList.map(([type, Component]) => {
        const props = getDefaultsByType(type as ComponentName);

        if (!props) {
          return <></>;
        }

        return (
          // @ts-expect-error любой зарегистрированный компонент
          <DraggableComponent children={<Component {...props} />} type={type} />
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

/** Используем кдля генерации базового айдишника компонента */
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

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item) => handleDrop("content.items", item),
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
      <BaseScreen screen={screen} />
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            height: "100dvh",
            gap: 24,
            padding: 32,
            boxSizing: "border-box",
          }}
        >
          <ComponentsShowcase />
          {/* <BaseScreen designSystem="AIO" screen={screen} /> */}
          <DropZone screen={screen} updateScreen={updateScreen} />
          <aside>
            <textarea
              value={JSON.stringify(screen, null, 2)}
              style={{ width: "100%", height: "100%", resize: "none" }}
            ></textarea>
          </aside>
        </div>
      </QueryClientProvider>
    </DndProvider>
  );
}

export default App;

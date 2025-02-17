import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { ComponentsShowcase } from "@widgets/Constructor/ui/ComponentsShowcase/ComponentsShowcase";
import { DropZone } from "@widgets/Constructor/ui/ScreenPreview/ScreenPreview";
import { useState } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

export const ConstructorPage = () => {
  const [screen, updateScreen] = useState<SDUIScreen>({
    content: { type: "list", items: [] },
  });

  return (
    <>
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
    </>
  );
};

import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { ComponentsShowcase } from "@widgets/constructor/ui/ComponentsShowcase/ComponentsShowcase";
import { DropZone } from "@widgets/constructor/ui/ScreenPreview/ScreenPreview";
import { useState } from "react";
import { DeviceFrameset } from "react-device-frameset";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import "react-device-frameset/styles/marvel-devices.min.css";
import { SchemaPreview } from "@entities/constructor/ui/SchemaPreview";

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

        <Panel defaultSize={32} minSize={25} maxSize={32}>
          <DeviceFrameset device="iPhone X" style={{ height: "100%" }}>
            <DropZone screen={screen} updateScreen={updateScreen} />
          </DeviceFrameset>
        </Panel>
        <PanelResizeHandle />

        <Panel minSize={20}>
          <SchemaPreview screen={screen} />
        </Panel>
      </PanelGroup>
    </>
  );
};

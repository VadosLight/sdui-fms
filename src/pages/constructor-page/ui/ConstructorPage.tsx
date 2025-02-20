import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { ComponentsShowcase } from "@widgets/constructor/ui/ComponentsShowcase/ComponentsShowcase";
import { DropZone } from "@widgets/constructor/ui/ScreenPreview/ScreenPreview";
import { useState } from "react";
import { DeviceFrameset } from "react-device-frameset";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import "react-device-frameset/styles/marvel-devices.min.css";
import { SchemaPreview } from "@entities/constructor/ui/SchemaPreview/SchemaPreview";
import { ConstructorHeader } from "@widgets/constructor/ui/ConstructorHeader/ConstructorHeader";
import { DeepReadonly } from "@shared/utils/DeepReadonly";
import { InputMobile } from "@alfalab/core-components/input/mobile";
import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import { aiGenerator } from "@widgets/constructor/lib/aiGenerator";
import { useMutation } from "@tanstack/react-query";

export const ConstructorPage = () => {
  const [screen, updateScreen] = useState<DeepReadonly<SDUIScreen>>({
    content: { type: "list", items: [] },
  });

  const [prompt, setPrompt] = useState("");

  const { mutate: generate, isPending } = useMutation({
    mutationFn: aiGenerator,
  });

  return (
    <div
      style={{
        height: "100dvh",
        padding: "8px 32px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: " space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 12,
          gap: 16,
        }}
      >
        <ConstructorHeader screen={screen} />
        <InputMobile
          value={prompt}
          size={"s"}
          label="Введите ваш запрос"
          block
          disabled={isPending}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <ButtonMobile
          size={"s"}
          view="primary"
          disabled={isPending}
          loading={isPending}
          onClick={() => {
            generate(
              { prompt, screen: JSON.stringify(screen) },
              {
                onSuccess: (resultText) => {
                  console.log({ resultText });
                  const parsed = JSON.parse(resultText || "");
                  updateScreen(parsed);
                },
                onError: console.error,
              }
            );

            // aiGenerator(JSON.stringify(screen), prompt).then((resultText) => {
            //   const parsed = JSON.parse(resultText || "");
            //   updateScreen(parsed);
            // });
          }}
        >
          Сгенерировать
        </ButtonMobile>
      </div>
      <PanelGroup
        direction="horizontal"
        autoSaveId={"sdui"}
        style={{
          height: "100%",
          boxSizing: "border-box",
          gap: 4,
          background: "white",
          padding: "32px 16px",
          borderRadius: "16px",
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
    </div>
  );
};

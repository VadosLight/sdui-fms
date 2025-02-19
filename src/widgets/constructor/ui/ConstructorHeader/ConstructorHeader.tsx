import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { DeepReadonly } from "@shared/utils/DeepReadonly";
import { useState } from "react";
import { ModalDesktop } from "@alfalab/core-components/modal/desktop";
import { BaseScreen } from "@screen/BaseScreen/BaseScreen";
import { DeviceFrameset } from "react-device-frameset";
import { InputMobile } from "@alfalab/core-components/input/mobile";

export type ConstructorHeaderProps = { screen: DeepReadonly<SDUIScreen> };

export const ConstructorHeader = (props: ConstructorHeaderProps) => {
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const { screen } = props;

  return (
    <header style={{ display: "flex", gap: 8, padding: "4px 0" }}>
      <ButtonMobile
        size={"xxs"}
        view="primary"
        onClick={() => setPreviewOpen(true)}
      >
        Предпросмотр
      </ButtonMobile>

      <ModalDesktop
        open={isPreviewOpen}
        onClose={() => setPreviewOpen(false)}
        size={"l"}
      >
        <ModalDesktop.Content>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <DeviceFrameset device="iPhone X" style={{ height: "100%" }}>
              <BaseScreen screen={screen} />
            </DeviceFrameset>

            <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
              <InputMobile block label="Category" value="underage-account" />
              <InputMobile label="Name" value="landingScreen" />
              <InputMobile
                label="Description"
                value="Конфиг лэндинга для открытия ПБС"
              />
              <InputMobile label="version" value="1" />
              <ButtonMobile onClick={() => alert("В разработке")}>
                Загрузить в Builder
              </ButtonMobile>
            </div>
          </div>
        </ModalDesktop.Content>
      </ModalDesktop>
    </header>
  );
};

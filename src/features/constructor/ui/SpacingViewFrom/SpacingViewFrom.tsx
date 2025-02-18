import { getElementById } from "@features/constructor/lib/getElementById";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { ComponentProps } from "@model/types/utils/ComponentProps";
import { useStore } from "@nanostores/react";
import { useState } from "react";
import { $spacings } from "@store/atoms/spacing";
import { Spacing } from "@model/types/fms/atoms/Spacing/Spacing";

export type SpacingViewFromProps = {
  screen: SDUIScreen;
  id?: string;
};

export const SpacingViewFrom = (props: SpacingViewFromProps) => {
  const { screen, id = "" } = props;

  const sizeVariants = Object.keys(useStore($spacings)["AIO"]); // TODO: useVariants

  const [currentElement, setElement] = useState(
    getElementById(id, screen) as ComponentProps<"SpacingView">
  );

  if (!currentElement) {
    return <>Компонент с таким айди не найден</>;
  }

  return (
    <div>
      {/* TODO: Entity  SpaceSelector */}
      <p>Размер отступа</p>
      <select
        value={currentElement.content.size}
        onChange={(e) => {
          setElement((prev) => ({
            ...prev,
            content: { ...prev.content, size: e.target.value as Spacing },
          }));
        }}
      >
        {sizeVariants.map((val) => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
};

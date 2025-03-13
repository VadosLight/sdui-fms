import { getElementById } from "@features/constructor/lib/getElementById";
import { ComponentProps } from "@model/types/utils/ComponentProps";
import { useEffect, useState } from "react";
import { $spacings } from "@store/atoms/spacing";
import { Spacing } from "@model/types/fms/atoms/Spacing/Spacing";
import { useVariants } from "@features/constructor/hooks/useVariants";
import { EditComponentFormProps } from "@features/constructor/model/types/EditComponentFormProps";
import { IdEditor } from "@entities/constructor/ui/IdEditor/IdEditor";
import { LayoutElement } from "@model/types/fms/common/LayoutElement/LayoutElement";

export const SpacingViewFrom = (props: EditComponentFormProps) => {
  const { screen, id, setNewComponent } = props;

  const sizeVariants = useVariants($spacings);

  const [currentElement, setElement] = useState(
    getElementById(id, screen) as ComponentProps<"SpacingView">
  );

  useEffect(() => {
    setNewComponent(currentElement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentElement]);

  if (!currentElement) {
    return <>Компонент с таким айди не найден</>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <IdEditor
        id={currentElement.id}
        setElement={setElement as React.Dispatch<React.SetStateAction<LayoutElement>>}
      />
      {/* TODO: Entity  SpaceSelector */}
      <div>
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
    </div>
  );
};

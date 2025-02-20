import { getElementById } from "@features/constructor/lib/getElementById";
import { ComponentProps } from "@model/types/utils/ComponentProps";
import { useEffect, useState } from "react";
import { EditComponentFormProps } from "@features/constructor/model/types/EditComponentFormProps";
import { IdEditor } from "@entities/constructor/ui/IdEditor/IdEditor";

export const TextLabelFrom = (props: EditComponentFormProps) => {
  const { screen, id = "", setNewComponent } = props;

  const [currentElement, setElement] = useState(
    getElementById(id, screen) as ComponentProps<"TextLabel">
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
      {/* @ts-expect-error надо поресерчить как суждать типы для сет стейтов  */}
      <IdEditor id={currentElement.id} setElement={setElement} />
      {/* TODO: Entity  SpaceSelector */}
      <div>
        <label htmlFor={id}>Текст</label>
        <input
          value={currentElement.content.text}
          id={id}
          onChange={(e) => {
            setElement((prev) => ({
              ...prev,
              content: { ...prev.content, text: e.target.value },
            }));
          }}
        />
      </div>
    </div>
  );
};

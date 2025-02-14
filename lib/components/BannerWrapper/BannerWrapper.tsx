import { ComponentProps } from "@model/types/utils/ComponentProps";
import { renderComponent } from "../../utils/renderComponent";
import { useDrop } from "react-dnd";
import { Underlay } from "@alfalab/core-components/underlay";

export const BannerWrapper = (props: ComponentProps<"BannerWrapper">) => {
  const { id, content, editMode, onDrop } = props;

  const { content: element, padding } = content;

  // Используем `useDrop`, только если `editMode === true`
  const [{ isOver }, dropRef] = useDrop(
    () =>
      editMode && onDrop && id
        ? {
            accept: "COMPONENT",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            drop: (item: any, monitor) => {
              if (monitor.didDrop()) {
                return;
              }

              if (typeof item?.type === "string") {
                onDrop(item.type, id);
              }
            },
            collect: (monitor) => ({
              isOver: !!monitor.isOver(),
            }),
          }
        : { accept: "" },
    [editMode]
  );

  return (
    <Underlay
      ref={editMode ? dropRef : undefined}
      borderRadius={"xl"}
      backgroundColor="red"
      style={{
        padding,
        border: editMode ? "1px dashed #888" : "none",
        background: isOver ? "#f0f0f0" : "transparent",
      }}
    >
      {element ? (
        renderComponent(element)
      ) : editMode ? (
        <p style={{ textAlign: "center", color: "#aaa" }}>Drop here</p>
      ) : null}
    </Underlay>
  );

  //   return dropRef(<div style={{ padding }}>{renderComponent(element)}</div>);

  //   return <div style={{ padding }}>{renderComponent(element)}</div>;
};

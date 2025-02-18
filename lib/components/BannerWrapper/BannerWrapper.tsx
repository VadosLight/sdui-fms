import { ComponentProps } from "@model/types/utils/ComponentProps";
import { renderComponent } from "../../utils/renderComponent";
import { Underlay } from "@alfalab/core-components/underlay";
import { Droppable } from "@components/HOCs/Droppable";

export const BannerWrapper = (props: ComponentProps<"BannerWrapper">) => {
  const { id, type, content, _editMode, _onDrop, _onRightClick } = props;

  const { content: element, padding } = content;

  return (
    <Droppable id={id} editMode={_editMode} onDrop={_onDrop}>
      {(isOver, dropRef) => (
        <Underlay
          onContextMenu={(e) => {
            if (id && _onRightClick) {
              _onRightClick(e, type, id);
            }
          }}
          ref={_editMode ? dropRef : undefined}
          borderRadius="xl"
          backgroundColor="red"
          style={{
            padding,
            margin: 6,
            border: _editMode ? "1px dashed #888" : "none",
            background: isOver ? "#e0e0e0" : "#0000ff10",
            boxShadow: isOver ? "0 0 8px rgba(0, 0, 255, 0.5)" : "none",
          }}
        >
          {element ? (
            renderComponent(element, {
              editMode: _editMode,
              onComponentDrop: _onDrop,
              onComponentRightClick: _onRightClick,
            })
          ) : _editMode ? (
            <p style={{ textAlign: "center", color: "#aaa" }}>Drop here</p>
          ) : null}
        </Underlay>
      )}
    </Droppable>
  );
};

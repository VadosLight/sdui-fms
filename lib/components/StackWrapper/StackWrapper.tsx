import { ComponentProps } from "@model/types/utils/ComponentProps";
import { renderComponent } from "../../utils/renderComponent";
import { Droppable } from "@components/HOCs/Droppable";
import React from "react";
import { useSpacings } from "@hooks/useSpacings";
import { usePaddings } from "@hooks/usePaddings";

export const StackWrapper = (props: ComponentProps<"StackWrapper">) => {
  const { id, type, content, _editMode, _onDrop, _onRightClick } = props;

  const {
    children,
    axis,
    alignment,
    horizontalAlignment = alignment || "center",
    verticalAlignment = "center",
    distribution = "fill",
    spacing = "none",
    padding,
  } = content;

  // Получаем значение отступа между элементами из дизайн-системы
  const spacingValue = useSpacings(spacing);

  // Получаем значения отступов для padding
  const paddingStyle = usePaddings(padding);

  // Преобразование значений выравнивания в CSS свойства
  const getHorizontalAlign = () => {
    switch (horizontalAlignment) {
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
      default:
        return "center";
    }
  };

  const getVerticalAlign = () => {
    switch (verticalAlignment) {
      case "top":
        return "flex-start";
      case "bottom":
        return "flex-end";
      default:
        return "center";
    }
  };

  // Преобразование значений распределения в CSS свойства
  const getJustifyContent = () => {
    switch (distribution) {
      case "fillEqually":
        return "space-around";
      case "spaceStart":
        return "flex-start";
      case "spaceEnd":
        return "flex-end";
      case "spaceBetween":
        return "space-between";
      default:
        return "flex-start";
    }
  };

  // Определяем стили для контейнера
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: axis === "horizontal" ? "row" : "column",
    alignItems: axis === "horizontal" ? getVerticalAlign() : getHorizontalAlign(),
    justifyContent: getJustifyContent(),
    gap: spacingValue,
    ...paddingStyle,
    border: _editMode ? "1px dashed #888" : "none",
    background: "transparent",
    minHeight: _editMode && children.length === 0 ? "50px" : undefined,
    width: "100%",
  };

  return (
    <Droppable id={id} editMode={_editMode} onDrop={_onDrop}>
      {(isOver, dropRef) => (
        <div
          onContextMenu={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            if (id && _onRightClick) {
              _onRightClick(e, type, id);
            }
          }}
          ref={_editMode ? dropRef : undefined}
          style={{
            ...containerStyle,
            background: isOver ? "#e0e0e0" : "transparent",
            boxShadow: isOver ? "0 0 8px rgba(0, 0, 255, 0.5)" : "none",
          }}
        >
          {children && children.length > 0 ? (
            children.map((child, index) => (
              <React.Fragment key={child.id || index}>
                {renderComponent(child, {
                  _editMode,
                  _onDrop,
                  _onRightClick,
                })}
              </React.Fragment>
            ))
          ) : (
            _editMode && (
              <p style={{ textAlign: "center", color: "#aaa", width: "100%" }}>
                Перетащите компоненты сюда
              </p>
            )
          )}
        </div>
      )}
    </Droppable>
  );
}; 
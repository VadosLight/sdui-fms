import { useDrop } from "react-dnd";
import React, { useState, useEffect, useRef } from "react";
import { ComponentName } from "@model/types/fms/common/LayoutElement/LayoutElement";

interface DroppableProps {
  id?: string;
  editMode?: boolean;
  onDrop?: (type: ComponentName, id: string, shouldReplace: boolean) => void;
  children: (
    isOver: boolean,
    dropRef: React.RefObject<HTMLDivElement>,
    shouldReplace: boolean
  ) => React.ReactNode;
  shouldReplace?: boolean;
}

export const Droppable: React.FC<DroppableProps> = ({
  id,
  editMode,
  onDrop,
  children,
  shouldReplace = false,
}) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [hasNestedDropZone, setHasNestedDropZone] = useState(false);

  const [{ isOverCurrent }, drop] = useDrop(
    () =>
      editMode && onDrop && id
        ? {
            accept: "COMPONENT",
            drop: (item: { type: ComponentName }, monitor) => {
              if (monitor.didDrop()) return;
              if (typeof item?.type === "string") {
                onDrop(item.type, id, shouldReplace);
              }
            },
            collect: (monitor) => ({
              isOverCurrent: !!monitor.isOver({ shallow: true }),
            }),
          }
        : { accept: "" },
    [editMode]
  );

  useEffect(() => {
    if (dropRef.current) {
      const nestedDropZones =
        dropRef.current.querySelectorAll("[data-drop-zone]");
      setHasNestedDropZone(nestedDropZones.length > 0);
    }
  }, [isOverCurrent]);

  useEffect(() => {
    setIsOver(isOverCurrent && !hasNestedDropZone);
  }, [isOverCurrent, hasNestedDropZone]);

  drop(dropRef); // Применяем ref без обертки

  return children(isOver, dropRef, shouldReplace);
};

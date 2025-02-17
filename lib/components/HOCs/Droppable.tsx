import { useDrop } from "react-dnd";
import React, { useState, useEffect, useRef } from "react";

interface DroppableProps {
  id?: string;
  editMode?: boolean;
  onDrop?: (type: string, id: string) => void;
  children: (
    isOver: boolean,
    dropRef: React.RefObject<HTMLDivElement>
  ) => React.ReactNode;
}

export const Droppable: React.FC<DroppableProps> = ({
  id,
  editMode,
  onDrop,
  children,
}) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [hasNestedDropZone, setHasNestedDropZone] = useState(false);

  const [{ isOverCurrent }, drop] = useDrop(
    () =>
      editMode && onDrop && id
        ? {
            accept: "COMPONENT",
            drop: (item: { type: string }, monitor) => {
              if (monitor.didDrop()) return;
              if (typeof item?.type === "string") {
                onDrop(item.type, id);
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

  return children(isOver, dropRef);
};

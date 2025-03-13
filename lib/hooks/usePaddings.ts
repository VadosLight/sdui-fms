// Этот файл больше не нужен, так как Padding теперь объект, а не строковый тип
// Для отступов используется Spacing и хук useSpacings 

import { useSpacings } from "./useSpacings";
import { Padding } from "@model/types/fms/atoms/Padding/Padding";

/**
 * Хук для обработки отступов со всех сторон
 * @param padding Объект с отступами
 * @returns Объект с CSS значениями для padding
 */
export const usePaddings = (padding?: Padding) => {
  const topPadding = useSpacings(padding?.top || "none");
  const rightPadding = useSpacings(padding?.right || "none");
  const bottomPadding = useSpacings(padding?.bottom || "none");
  const leftPadding = useSpacings(padding?.left || "none");

  // Преобразуем padding в CSS значения
  return {
    paddingTop: topPadding,
    paddingRight: rightPadding,
    paddingBottom: bottomPadding,
    paddingLeft: leftPadding,
  };
}; 
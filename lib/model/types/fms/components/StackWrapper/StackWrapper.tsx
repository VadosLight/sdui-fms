import { LayoutElement } from "../../common/LayoutElement/LayoutElement";
import { Padding } from "../../atoms/Padding/Padding";
import { Spacing } from "../../atoms/Spacing/Spacing";

export type StackWrapper = {
  /**
   * Выравнивание элементов относительно горизонтальной оси
   * @deprecated
   */
  alignment?: "left" | "right" | "center";
  /**
   * Выравнивание элементов относительно горизонтальной оси, по умолчанию center
   */
  horizontalAlignment?: "left" | "right" | "center";
  /**
   * Выравнивание элементов относительно вертикальной оси, по умолчанию center
   */
  verticalAlignment?: "top" | "bottom" | "center";
  /**
   * Отступ между элементами, по умолчанию none
   */
  spacing?: Spacing;
  /**
   * Основная ось стека
   */
  axis: "vertical" | "horizontal";
  /**
   * Формат распределения элементов, по умолчанию fill
   */
  distribution?: "fill" | "fillEqually" | "spaceStart" | "spaceEnd" | "spaceBetween";
  /**
   * Массив дочерних элементов
   */
  children: LayoutElement[];
  /**
   * Отступ дочерних элементов от краев стека
   */
  padding?: Padding;
}; 
import { Spacing } from "../Spacing/Spacing";

/**
 * Модель для отступов от каждого края
 */
export type Padding = {
  /**
   * Отступ от верхнего края, по умолчанию none
   */
  top?: Spacing;
  /**
   * Отступ от левого края, по умолчанию none
   */
  left?: Spacing;
  /**
   * Отступ от нижнего края, по умолчанию none
   */
  bottom?: Spacing;
  /**
   * Отступ от правого края, по умолчанию none
   */
  right?: Spacing;
}; 
import {
  ComponentName,
  LayoutElement,
} from "../fms/common/LayoutElement/LayoutElement";

/** Пропсы используются только в режиме конструктора */
type BuilderSpecific = {
  /**
   *  Используется только в режиме билдера
   *
   */
  _editMode?: boolean;
  /**
   *  Используется только в режиме билдера, нужно для работы DnD
   *
   */
  _onDrop?: (itemType: ComponentName, id: string) => void;
  /**
   * Используется только в режиме билдера, нужно для открытия меню компонента
   */
  _onRightClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    itemType: ComponentName,
    id: string
  ) => void;
};

export type ComponentProps<T extends ComponentName> = Extract<
  LayoutElement,
  { type: T }
> &
  BuilderSpecific;

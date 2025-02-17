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
  editMode?: boolean;
  /**
   *  Используется только в режиме билдера
   *
   */
  onDrop?: (itemType: ComponentName, id: string) => void;

  // onDrop?: (item: any) => void;
};

export type ComponentProps<T extends ComponentName> = Extract<
  LayoutElement,
  { type: T }
> &
  BuilderSpecific;

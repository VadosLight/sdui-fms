import {
  ComponentName,
  LayoutElement,
} from "../fms/common/LayoutElement/LayoutElement";

export type ComponentProps<T extends ComponentName> = Extract<
  LayoutElement,
  { type: T }
>;

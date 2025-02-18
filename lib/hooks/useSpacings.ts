import { Spacing } from "@model/types/fms/atoms/Spacing/Spacing";
import { useStore } from "@nanostores/react";
import { $spacings } from "@store/atoms/spacing";
import { useDesignSystem } from "./useDesignSystem";

export const useSpacings = (size: Spacing) => {
  const ds = useDesignSystem();
  const spacings = useStore($spacings);

  return spacings[ds][size];
};

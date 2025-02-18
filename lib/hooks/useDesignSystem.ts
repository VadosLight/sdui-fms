import { useStore } from "@nanostores/react";
import { $designSystem } from "@store/atoms/designSystem";

export const useDesignSystem = () => {
  return useStore($designSystem);
};

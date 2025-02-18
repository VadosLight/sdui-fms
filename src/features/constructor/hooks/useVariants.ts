import { useDesignSystem } from "@hooks/useDesignSystem";
import { useStore } from "@nanostores/react";
import { Store } from "nanostores";

export const useVariants = (storage: Store) => {
  const ds = useDesignSystem();
  const storeData = useStore(storage);

  return Object.keys(storeData[ds]);
};

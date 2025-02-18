import { ComponentName } from "@model/types/fms/common/LayoutElement/LayoutElement";
import { useState } from "react";

type Component = {
  id: string;
  type: ComponentName;
};

export const useComponentMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [component, setComponent] = useState<Component>();

  return {
    isMenuOpen: isOpen,
    setIsMenuOpen: setIsOpen,
    component,
    setComponent,
  };
};

import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { LayoutElement } from "../../../../lib/model/types/fms/common/LayoutElement/LayoutElement";
import { DeepReadonly } from "@shared/utils/DeepReadonly";

export const getElementById = (
  id: string,
  screen: DeepReadonly<SDUIScreen>
): LayoutElement | null => {
  const searchElement = (
    element: DeepReadonly<SDUIScreen | LayoutElement>
  ): LayoutElement | null => {
    if (!element || typeof element !== "object") return null;

    // @ts-expect-error Для простоты жизни
    if (element.id === id) {
      // @ts-expect-error Для простоты жизни
      return element;
    }

    // Проходим по всем ключам объекта
    for (const key of Object.keys(element)) {
      // @ts-expect-error Для простоты жизни
      const value = element[key];

      if (Array.isArray(value)) {
        // Если значение - массив, рекурсивно ищем в нем
        for (const child of value) {
          const found = searchElement(child);
          if (found) return found;
        }
      } else if (typeof value === "object" && value !== null) {
        // Если значение - объект, продолжаем поиск
        const found = searchElement(value);
        if (found) return found;
      }
    }

    return null;
  };

  return searchElement(screen);
};

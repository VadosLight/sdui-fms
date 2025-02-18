import {
  LayoutElement,
  ComponentName,
} from "@model/types/fms/common/LayoutElement/LayoutElement";
import { generateId } from "./generateId";
import { getDefaultsByType } from "./getDefaultsByType";

/**
 * Обновляет содержимое конкретного компонента в списке LayoutElements.
 * Если компонент найден, его содержимое заменяется значениями по умолчанию для нового типа.
 *
 * @param items - Массив LayoutElements, в котором производится поиск.
 * @param id - ID компонента, который нужно обновить.
 * @param elementType - Новый тип компонента.
 * @returns Новый массив с обновленным компонентом.
 */
export const updateComponentContent = (
  items: LayoutElement[],
  id: string,
  elementType: ComponentName
): LayoutElement[] => {
  // Получаем значения по умолчанию для нового типа компонента.
  const newContentValues = getDefaultsByType(elementType);
  if (!newContentValues) return items;

  /**
   * Рекурсивно проходит по структуре и заменяет содержимое нужного компонента.
   *
   * @param element - Текущий LayoutElement, который проверяется.
   * @returns Обновленный LayoutElement, если он соответствует ID, иначе возвращается без изменений.
   */
  const recursiveItemReplace = (element: LayoutElement): LayoutElement => {
    if (element.type !== "BannerWrapper") {
      // console.log(`Элемент ${element.type} не поддерживает обработку DnD`);
      return element;
    }

    if (element.id !== id) {
      // Если у элемента есть вложенный контент, применяем рекурсию
      if (element.content?.content) {
        return {
          ...element,
          content: {
            ...element.content,
            content: { ...recursiveItemReplace(element.content.content) },
          },
        };
      }
      return element;
    }

    // Если элемент найден, заменяем его содержимое новыми значениями
    return {
      ...element,
      id: generateId(), // Генерируем новый ID, чтобы отличить обновленный компонент
      content: {
        ...element.content,
        content: { id: generateId(), ...newContentValues },
      },
    };
  };

  // Применяем рекурсивную замену ко всем элементам в списке
  return items.map((item) => recursiveItemReplace(item));
};

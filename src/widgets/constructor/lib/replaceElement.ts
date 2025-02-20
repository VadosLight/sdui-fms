import { LayoutElement } from "@model/types/fms/common/LayoutElement/LayoutElement";

// TODO: Покрыть тестами и применить
export const replaceElement = (
  data: unknown,
  newElement: LayoutElement,
  oldId: string
): unknown => {
  if (Array.isArray(data)) {
    // Рекурсивно обрабатываем каждый элемент массива
    return data.map((item) => replaceElement(item, newElement, oldId));
  } else if (data !== null && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    // Если объект имеет свойство id, совпадающее с oldId, возвращаем копию newElement
    if ("id" in obj && obj.id === oldId) {
      return { ...newElement };
    }
    // Рекурсивно обрабатываем все свойства объекта
    const newObj: Record<string, unknown> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = replaceElement(obj[key], newElement, oldId);
      }
    }
    return newObj;
  }
  // Примитивы возвращаем без изменений
  return data;
};

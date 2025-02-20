// Определяем рекурсивный тип данных
export type Data =
  | string
  | number
  | boolean
  | null
  | Data[]
  | ({ id?: string } & { [key: string]: Data });

// Функция removeElement, которая удаляет объект с заданным id из любой структуры данных
// TODO: Покрыть тестами и применить
export const removeElement = (
  data: Data,
  idToRemove: string
): Data | undefined => {
  if (Array.isArray(data)) {
    // Обрабатываем каждый элемент массива и фильтруем удалённые (undefined)
    return data
      .map((item) => removeElement(item, idToRemove))
      .filter((item): item is Data => item !== undefined);
  } else if (data !== null && typeof data === "object") {
    // Если объект имеет свойство id, совпадающее с idToRemove, возвращаем undefined,
    // чтобы исключить его из результирующей структуры.
    if ("id" in data && data.id === idToRemove) {
      return undefined;
    }
    // Рекурсивно обрабатываем все свойства объекта
    const newObj: { [key: string]: Data } = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const processedValue = removeElement(data[key], idToRemove);
        // Если значение свойства не удалено, сохраняем его
        if (processedValue !== undefined) {
          newObj[key] = processedValue;
        }
      }
    }
    return newObj;
  }
  // Для примитивов возвращаем значение без изменений.
  return data;
};

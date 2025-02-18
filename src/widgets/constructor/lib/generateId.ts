import { customAlphabet } from "nanoid";

/** Используем для генерации базового айдишника компонента */
export const generateId = customAlphabet("1234567890abcdef", 10);

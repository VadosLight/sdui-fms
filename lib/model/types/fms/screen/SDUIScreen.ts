import { Content } from "./content/Content";
// import { TopBarContent } from './TopBarContent';

/**
 * Модель для описания SDUI экрана
 * */
export type SDUIScreen = {
  // /**
  //  * Топбар
  //  * */
  // header?: TopBarContent;
  /**
   * Основной контент экрана
   * */
  content: Content;
  // /**
  //  * Плавающий контент внизу экрана, например кнопка
  //  * */
  // footer?: LayoutElement;
  // /**
  //  * Аналитика успешной загрузки SDUIScreen
  //  * */
  // analytics?: AnalyticsEvent;
};

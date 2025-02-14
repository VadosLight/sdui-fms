import { ContentList } from "./ContentList";

type AvailableTypes = "list";
type ContentByType<Type extends AvailableTypes, Content> = Content & {
  type: Type;
};

export type ContentType = ContentByType<"list", ContentList>;

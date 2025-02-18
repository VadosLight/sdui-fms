import { LayoutElement } from "@model/types/fms/common/LayoutElement/LayoutElement";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";

export type EditComponentFormProps = {
  screen: SDUIScreen;
  id?: string;
  setNewComponent: React.Dispatch<React.SetStateAction<LayoutElement>>;
};

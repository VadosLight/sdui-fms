import { LayoutElement } from "@model/types/fms/common/LayoutElement/LayoutElement";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { DeepReadonly } from "@shared/utils/DeepReadonly";

export type EditComponentFormProps = {
  screen: DeepReadonly<SDUIScreen>;
  id: string;
  setNewComponent: React.Dispatch<React.SetStateAction<LayoutElement>>;
};

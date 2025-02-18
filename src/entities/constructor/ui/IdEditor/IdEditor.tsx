import { InputMobile } from "@alfalab/core-components/input/mobile";
import { LayoutElement } from "@model/types/fms/common/LayoutElement/LayoutElement";

export type IdEditorProps = {
  id?: string;
  setElement: React.Dispatch<React.SetStateAction<LayoutElement>>;
};

export const IdEditor = (props: IdEditorProps) => {
  const { id, setElement } = props;

  return (
    <InputMobile
      value={id}
      block
      placeholder="ID"
      label="ID компонента"
      onChange={(e) => {
        setElement((prev) => ({ ...prev, id: e.target.value }));
      }}
    />
  );
};

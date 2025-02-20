import { InputMobile } from "@alfalab/core-components/input/mobile";
import { LayoutElement } from "@model/types/fms/common/LayoutElement/LayoutElement";
import { useState } from "react";
import { useDebounce } from "react-use";

export type IdEditorProps = {
  id?: string;
  setElement: React.Dispatch<React.SetStateAction<LayoutElement>>;
};

export const IdEditor = (props: IdEditorProps) => {
  const { id, setElement } = props;
  const [state, setState] = useState(id);

  // костыль, надо вынести этот компонент из формы типа SpacingViewForm
  useDebounce(
    () => {
      setElement((prev) => ({ ...prev, id: state }));
    },
    500,
    [state]
  );

  return (
    <InputMobile
      tabIndex={1}
      value={state}
      block
      placeholder="ID"
      label="ID компонента"
      onChange={(e) => {
        setState(e.target.value);
      }}
    />
  );
};

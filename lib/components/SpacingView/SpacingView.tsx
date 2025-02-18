import { ComponentProps } from "@model/types/utils/ComponentProps";

export const SpacingView = (props: ComponentProps<"SpacingView">) => {
  const { id, type, _onRightClick } = props;

  return (
    <div
      style={{ height: "16px" }}
      key={id}
      onContextMenu={(e) => {
        if (id && _onRightClick) {
          _onRightClick(e, type, id);
        }
      }}
    ></div>
  );
};

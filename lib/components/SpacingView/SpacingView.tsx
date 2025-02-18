import { useSpacings } from "@hooks/useSpacings";
import { ComponentProps } from "@model/types/utils/ComponentProps";

export const SpacingView = (props: ComponentProps<"SpacingView">) => {
  const size = useSpacings(props.content.size);
  const { id, type, _onRightClick } = props;

  return (
    <div
      style={{ minHeight: size, height: size, maxHeight: size }}
      key={id}
      onContextMenu={(e) => {
        if (id && _onRightClick) {
          _onRightClick(e, type, id);
        }
      }}
    ></div>
  );
};

import { ComponentProps } from "@model/types/utils/ComponentProps";

export const ImageView = (props: ComponentProps<"ImageView">) => {
  const { id, type, _onRightClick, content } = props;

  return (
    <img
      style={{ width: "100%" }}
      alt=""
      src={content.image.url}
      onContextMenu={(e) => {
        if (id && _onRightClick) {
          _onRightClick(e, type, id);
        }
      }}

      // className={backgroundImageScaleClassName}
      // height={IMAGE_SIZE[size]}
      // style={{
      //   borderRadius: hasRoundedCorners ? '12px' : undefined,
      //   backgroundColor,
      // }}
    />
  );
};

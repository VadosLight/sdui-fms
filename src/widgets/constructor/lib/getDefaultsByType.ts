import { ComponentName } from "@model/types/fms/common/LayoutElement/LayoutElement";
import { ComponentProps } from "@model/types/utils/ComponentProps";

export const getDefaultsByType = (type: ComponentName) => {
  switch (type) {
    case "ButtonView":
      return {
        type: "ButtonView",
        content: { enabled: true, size: "large", text: "Просто кнопка" },
      } as ComponentProps<"ButtonView">;

    case "BannerWrapper":
      return {
        type: "BannerWrapper",
        content: {
          padding: 4,
          style: {
            backgroundColor: "transparent",
            style: "fill",
          },
          content: {
            type: "ButtonView",
            content: {
              text: "Кнопка внутри баннера",
            },
          },
        },
      } as ComponentProps<"BannerWrapper">;

    case "TextFieldView":
      return {
        type: "TextFieldView",
        content: {
          text: "Текст из TextFieldView",
          title: "Подпись к полю",
          placeholder: "Плейсхолдер",
        },
      } as ComponentProps<"TextFieldView">;

    case "TextLabel":
      return {
        type: "TextLabel",
        content: {
          text: "Lorem ipsum",
          lineLimit: 3,
          preset: "paragraph",
        },
      } as ComponentProps<"TextLabel">;
    case "SpacingView":
      return {
        type: "SpacingView",
        content: {
          size: "m",
        },
      } as ComponentProps<"SpacingView">;
    case "ImageView":
      return {
        type: "ImageView",
        content: {
          image: {
            url: "https://preview.redd.it/co92k3bquj071.jpg?auto=webp&s=1d3a710a8c5109de888f5031b1b490ad2b016403",
          },
        },
      } as ComponentProps<"ImageView">;
    case "StackWrapper":
      return {
        type: "StackWrapper",
        content: {
          axis: "vertical",
          horizontalAlignment: "center",
          verticalAlignment: "center",
          distribution: "fill",
          spacing: 'xl',
          padding: "m",
          children: [],
        },
      } as ComponentProps<"StackWrapper">;
  }

  return undefined;
};

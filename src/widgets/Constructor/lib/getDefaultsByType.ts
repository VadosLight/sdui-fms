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
  }

  return undefined;
};

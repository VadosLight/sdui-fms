const example = `Запомни примеры компонентов. 
Отвечай на все запросы только готовым JSON с заданной ниже структурой. 
Компоненты могут иметь только те поля, которые есть в примере.
Итоговый JSON всегда должен содержать поле "content", а поле "content" всегда содержит поля "type" и ""items".
{
  "content": {
    "type": "list",
    "items": [
      {
        "id": "105ab1eec6",
        "visible": true,
        "type": "ButtonView",
        "content": {
          "enabled": true,
          "size": "large",
          "text": "Просто кнопка"
        }
      },
      {
        "id": "78035824e9",
        "visible": true,
        "type": "TextFieldView",
        "content": {
          "text": "Текст из TextFieldView",
          "title": "Подпись к полю",
          "placeholder": "Плейсхолдер"
        }
      },
      {
        "id": "e5740c3c8b",
        "visible": true,
        "type": "BannerWrapper",
        "content": {
          "padding": 4,
          "style": {
            "backgroundColor": "transparent",
            "style": "fill"
          },
          "content": {
            "type": "ButtonView",
            "content": {
              "text": "Кнопка внутри баннера"
            }
          }
        }
      },
      {
        "id": "238dd5e473",
        "visible": true,
        "type": "TextLabel",
        "content": {
          "text": "Lorem ipsum",
          "lineLimit": 3,
          "preset": "paragraph"
        }
      },
      {
        "id": "36499dbb7f",
        "visible": true,
        "type": "SpacingView",
        "content": {
          "size": "m"
        }
      }
    ]
  }
}
`;

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
// import {streamText  } from "ai";

const provider = createOpenRouter({
  apiKey: import.meta.env.VITE_AI_API_KEY,
  // Extra body to pass to OpenRouter
  extraBody: {
    custom_field: "custom_value",
    providers: {
      anthropic: {
        custom_field: "custom_value",
      },
    },
  },
});

const model = provider.chat("microsoft/phi-3-medium-128k-instruct:free");
// const model = provider.chat("google/gemma-2-9b-it:free");

type GeneratorProps = {
  screen: string;
  prompt: string;
};

export const aiGenerator = async ({ prompt, screen }: GeneratorProps) => {
  const response = await model.doGenerate({
    inputFormat: "prompt",
    mode: { type: "regular" },
    prompt: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: example,
          },
          {
            type: "text",
            text: `Используй следующий JSON для основы. Все новые компоненты обязательно должны добавляться в content.items или их дочерние элементы. Верни только модифицированную структуру. ${screen}`,
          },
          {
            type: "text",
            text: prompt,
          },
        ],
      },
    ],
  });

  console.log({ response });
  return response.text;
};

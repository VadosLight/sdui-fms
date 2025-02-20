import { expect, test } from "vitest";
import { getElementById } from "./getElementById";
import { SDUIScreen } from "@model/types/fms/screen/screen/SDUIScreen";
import { LayoutElement } from "@model/types/fms/common/LayoutElement/LayoutElement";

const testElement: LayoutElement = {
  id: "e5d58a5e6d",
  type: "BannerWrapper",
  content: {
    padding: 4,
    style: {
      backgroundColor: "transparent",
      style: "fill",
    },
    content: {
      id: "1ac5bd7e29",
      type: "ButtonView",
      content: {
        enabled: true,
        size: "large",
        text: "Просто кнопка",
      },
    },
  },
};

const testScreen: SDUIScreen = {
  content: {
    type: "list",
    items: [
      {
        id: "ad517dbdf4",
        visible: true,
        type: "BannerWrapper",
        content: {
          padding: 4,
          style: {
            backgroundColor: "transparent",
            style: "fill",
          },
          content: {
            id: "2567ae7e96",
            type: "BannerWrapper",
            content: {
              padding: 4,
              style: {
                backgroundColor: "transparent",
                style: "fill",
              },
              content: testElement,
            },
          },
        },
      },
    ],
  },
};

test("Находит элемент по id", () => {
  expect(getElementById("e5d58a5e6d", testScreen)).equal(testElement);
});

import { LayoutElement } from "../../common/LayoutElement/LayoutElement";

export type BannerWrapper = {
  content: LayoutElement;
  padding?: number; // TODO: Padding
  style: {
    backgroundColor: string; // TODO: Color
    style: "fill" | "shadow" | "stroke";
  };
};

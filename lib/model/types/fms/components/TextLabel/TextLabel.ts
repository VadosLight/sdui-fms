type Preset = "h1" | "h2" | "h3" | "h4" | "paragraph" | "description";

export type TextLabel = {
  text: string;
  lineLimit?: number;
  preset?: Preset;
};

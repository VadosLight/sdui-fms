import { ComponentProps } from "@model/types/utils/ComponentProps";
import { renderComponent } from "../../utils/renderComponent";

export const BannerWrapper = (props: ComponentProps<"BannerWrapper">) => {
  const { content } = props;

  const { content: element, padding } = content;

  return <div style={{ padding }}>{renderComponent(element)}</div>;
};

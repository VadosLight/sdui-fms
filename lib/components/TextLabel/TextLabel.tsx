import { useEffect, useRef } from "react";
import { Typography } from "@alfalab/core-components/typography";
import { TextElementType } from "@alfalab/core-components/typography/types";

import { ComponentProps } from "@model/types/utils/ComponentProps";

export const TextLabel = (props: ComponentProps<"TextLabel">) => {
  const {
    id,
    type,
    _onRightClick,
    content: { text, lineLimit, preset },
  } = props;

  const containerRef = useRef<TextElementType | HTMLHeadingElement>(null);

  let isTitle = false;

  if (preset) {
    isTitle =
      preset === "h1" || preset === "h2" || preset === "h3" || preset === "h4";
  }

  useEffect(() => {
    if (containerRef.current && lineLimit) {
      const { style } = containerRef.current;

      style.setProperty("--lineLimit", String(lineLimit));
    }
  }, [lineLimit]);

  const handleContectClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    if (id && _onRightClick) {
      _onRightClick(e, type, id);
    }
  };

  if (isTitle) {
    return (
      <Typography.TitleMobile
        tag="div"
        onContextMenu={handleContectClick}
        // view={innerTypography}
        // style={{
        //   color: innerColor,
        //   textAlign,
        //   justifyContent,
        //   ...innerPadding,
        // }}
        // className={styles.container}
      >
        <span ref={containerRef}>{text}</span>
      </Typography.TitleMobile>
    );
  }

  return (
    <Typography.Text
      onContextMenu={handleContectClick}
      //   view={innerTypography}
      //   style={{
      //     color: innerColor,
      //     textAlign,
      //     ...innerPadding,
      //   }}
      ref={containerRef}
    >
      {text}
    </Typography.Text>
  );
};

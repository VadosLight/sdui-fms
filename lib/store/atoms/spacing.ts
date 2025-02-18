import { deepMap } from "nanostores";
import { DEFAULT_DS } from "../../utils/constants/defaults";
import { Spacing } from "../../model/types/fms/atoms/Spacing/Spacing";

type SpacingDesignSystem = {
  [keys in Spacing]: number;
};

type SpacingStore = Record<string, SpacingDesignSystem>;

export const $spacings = deepMap<SpacingStore>({
  [DEFAULT_DS]: {
    none: 0,
    xs3: 2,
    xs2: 4,
    xs: 8,
    s: 12,
    m: 16,
    l: 20,
    xl: 24,
    xl2: 32,
    xl3: 40,
    xl4: 48,
    xl5: 64,
    xl6: 72,
    extendedHorizontalMargin: 16,
    horizontalMargin: 16,
  },
});

export const registerSpacing = (
  designSystem: string,
  value: SpacingDesignSystem
): void => {
  $spacings.setKey(designSystem, value);
};

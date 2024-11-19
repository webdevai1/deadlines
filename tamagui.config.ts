import { shorthands } from "@tamagui/shorthands";
import { createTamagui, createTokens } from "tamagui";
import {
  animations,
  tokens as defaultTokens,
  fonts,
  media,
} from "@tamagui/config/v3";

import * as themes from "./theme-output";
import { colors } from "./constants/colors";

const tokens = createTokens({
  ...defaultTokens,
  color: colors,
});

const config = createTamagui({
  animations,
  fonts,
  media,
  shorthands,
  themes,
  tokens,
});

type Conf = typeof config;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
export default config;

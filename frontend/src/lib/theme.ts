import { ColorScheme, MantineThemeOverride } from "@mantine/core";

export const theme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  colorScheme: colorScheme,
  primaryColor: "grape",
  focusRing: "never",
});

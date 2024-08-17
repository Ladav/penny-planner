import { Theme } from "@react-navigation/native";
import { vars } from "nativewind";

const lightTheme = {
  "color-primary-default": "#FFFFFF",
  "color-primary-light": "#F8F8FF",
  "color-secondary-default": "#8A2BE2", // Deep purple
  "color-secondary-light": "#9370DB", // Medium purple
  "color-tertiary-default": "#9932CC", // Dark orchid
  "color-tertiary-light": "#BA55D3", // Medium orchid
  "color-accent-default": "#4B0082", // Indigo
  "color-accent-light": "#6A5ACD", // Slate blue
  "color-grey-default": "#A9A9A9",
  "color-slate-default": "#708090",
  "color-dark-default": "#2A0A29", // Very dark purple
  "color-light-default": "#FFFFFF",
  "color-overlay": "rgba(138, 43, 226, 0.2)", // Semi-transparent purple
};

const darkTheme = {
  "color-primary-default": "#2A0A29", // Very dark purple
  "color-primary-light": "#3D0F3C", // Dark purple
  "color-secondary-default": "#8A2BE2", // Deep purple
  "color-secondary-light": "#9370DB", // Medium purple
  "color-tertiary-default": "#9932CC", // Dark orchid
  "color-tertiary-light": "#BA55D3", // Medium orchid
  "color-accent-default": "#E6E6FA", // Lavender
  "color-accent-light": "#D8BFD8", // Thistle
  "color-grey-default": "#B8B8B8",
  "color-slate-default": "#87CEEB",
  "color-dark-default": "#000000",
  "color-light-default": "#FFFFFF",
  "color-overlay": "rgba(255, 255, 255, 0.1)",
};

export const themesColors = {
  light: lightTheme,
  dark: darkTheme,
};

export const themes = {
  light: vars({
    "--color-primary-default": themesColors.light["color-primary-default"],
    "--color-primary-light": themesColors.light["color-primary-light"],
    "--color-secondary-default": themesColors.light["color-secondary-default"],
    "--color-secondary-light": themesColors.light["color-secondary-light"],
    "--color-tertiary-default": themesColors.light["color-tertiary-default"],
    "--color-tertiary-light": themesColors.light["color-tertiary-light"],
    "--color-accent-default": themesColors.light["color-accent-default"],
    "--color-accent-light": themesColors.light["color-accent-light"],
    "--color-grey-default": themesColors.light["color-grey-default"],
    "--color-slate-default": themesColors.light["color-slate-default"],
    "--color-dark-default": themesColors.light["color-dark-default"],
    "--color-light-default": themesColors.light["color-light-default"],
    "--color-overlay": themesColors.light["color-overlay"],
  }),
  dark: vars({
    "--color-primary-default": themesColors.dark["color-primary-default"],
    "--color-primary-light": themesColors.dark["color-primary-light"],
    "--color-secondary-default": themesColors.dark["color-secondary-default"],
    "--color-secondary-light": themesColors.dark["color-secondary-light"],
    "--color-tertiary-default": themesColors.dark["color-tertiary-default"],
    "--color-tertiary-light": themesColors.dark["color-tertiary-light"],
    "--color-accent-default": themesColors.dark["color-accent-default"],
    "--color-accent-light": themesColors.dark["color-accent-light"],
    "--color-grey-default": themesColors.dark["color-grey-default"],
    "--color-slate-default": themesColors.dark["color-slate-default"],
    "--color-dark-default": themesColors.dark["color-dark-default"],
    "--color-light-default": themesColors.dark["color-light-default"],
    "--color-overlay": themesColors.dark["color-overlay"],
  }),
};

export const NativgationDarkTheme: Theme = {
  dark: true,
  colors: {
    primary: themesColors.dark["color-secondary-default"], // Deep purple
    background: themesColors.dark["color-primary-default"], // Very dark purple (primary-default from dark theme)
    card: themesColors.dark["color-primary-light"], // Dark purple (primary-light from dark theme)
    text: themesColors.dark["color-accent-default"], // Lavender (accent-default from dark theme)
    border: themesColors.dark["color-secondary-light"], // Medium purple (secondary-light from both themes)
    notification: themesColors.dark["color-tertiary-light"], // Medium orchid (tertiary-light from both themes)
  },
};

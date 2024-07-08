import { Theme } from "@react-navigation/native";
import { vars } from "nativewind";

export const themes = {
  light: vars({
    "--color-primary-default": "#FFFFFF",
    "--color-primary-light": "#F8F8FF",
    "--color-secondary-default": "#8A2BE2", // Deep purple
    "--color-secondary-light": "#9370DB", // Medium purple
    "--color-tertiary-default": "#9932CC", // Dark orchid
    "--color-tertiary-light": "#BA55D3", // Medium orchid
    "--color-accent-default": "#4B0082", // Indigo
    "--color-accent-light": "#6A5ACD", // Slate blue
    "--color-grey-default": "#A9A9A9",
    "--color-slate-default": "#708090",
    "--color-dark-default": "#2A0A29", // Very dark purple
    "--color-light-default": "#FFFFFF",
    "--color-overlay": "rgba(138, 43, 226, 0.2)", // Semi-transparent purple
  }),
  dark: vars({
    "--color-primary-default": "#2A0A29", // Very dark purple
    "--color-primary-light": "#3D0F3C", // Dark purple
    "--color-secondary-default": "#8A2BE2", // Deep purple
    "--color-secondary-light": "#9370DB", // Medium purple
    "--color-tertiary-default": "#9932CC", // Dark orchid
    "--color-tertiary-light": "#BA55D3", // Medium orchid
    "--color-accent-default": "#E6E6FA", // Lavender
    "--color-accent-light": "#D8BFD8", // Thistle
    "--color-grey-default": "#B8B8B8",
    "--color-slate-default": "#87CEEB",
    "--color-dark-default": "#000000",
    "--color-light-default": "#FFFFFF",
    "--color-overlay": "rgba(255, 255, 255, 0.1)",
  }),
};

export const NativgationDarkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#8A2BE2',     // Deep purple
    background: '#2A0A29',  // Very dark purple (primary-default from dark theme)
    card: '#3D0F3C',        // Dark purple (primary-light from dark theme)
    text: '#E6E6FA',        // Lavender (accent-default from dark theme)
    border: '#9370DB',      // Medium purple (secondary-light from both themes)
    notification: '#BA55D3', // Medium orchid (tertiary-light from both themes)
  },
};
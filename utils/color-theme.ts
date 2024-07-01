import { vars } from "nativewind";

export const themes = {
  light: vars({
    "--color-primary-default": "#FFFFFF",
    "--color-primary-light": "#F5F5F5",
    "--color-secondary-default": "#FFD700",
    "--color-secondary-light": "#FFEB3B",
    "--color-tertiary-default": "#FFC107",
    "--color-tertiary-light": "#FFE082",
    "--color-accent-default": "#FF9800",
    "--color-accent-light": "#FFB74D",
    "--color-grey-default": "#9E9E9E",
    "--color-slate-default": "#607D8B",
    "--color-dark-default": "#212121",
    "--color-light-default": "#FFFFFF",
    "--color-overlay": "rgba(0, 0, 0, 0.5)",
  }),
  dark: vars({
    "--color-primary-default": "#000000",
    "--color-primary-light": "#212121",
    "--color-secondary-default": "#FFD700",
    "--color-secondary-light": "#FFEB3B",
    "--color-tertiary-default": "#FFC107",
    "--color-tertiary-light": "#FFE082",
    "--color-accent-default": "#FF9800",
    "--color-accent-light": "#FFB74D",
    "--color-grey-default": "#757575",
    "--color-slate-default": "#B0BEC5",
    "--color-dark-default": "#000000",
    "--color-light-default": "#FFFFFF",
    "--color-overlay": "rgba(255, 255, 255, 0.1)",
  }),
};

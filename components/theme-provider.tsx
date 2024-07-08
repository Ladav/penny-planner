import React, { createContext } from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { themes } from "@/utils/color-theme.utils";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<{
  theme: "light" | "dark";
}>({ theme: "dark" });

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme } = useColorScheme();
  const scheme = colorScheme === "light" ? "light" : "dark";
  return (
    <ThemeContext.Provider value={{ theme: scheme }}>
      <View style={themes['dark']} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

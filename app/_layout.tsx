// TODO: Add a loading screen and check if font is loading fine
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect } from "react";
import { useFonts } from "expo-font";
import { migrateDbIfNeeded } from "@/utils/db.utils";
import Fallback from "@/components/fallback";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { NativgationDarkTheme, themesColors } from "@/utils/color-theme.utils";
import { interFontMedium } from "@/constants/font.constant";

import "../global.css";

export default function Layout() {
  const insets = useSafeAreaInsets();
  const [loaded] = useFonts({
    Inter: interFontMedium,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar
        style="light"
        backgroundColor={themesColors.dark["color-primary-default"]}
      />
      <ThemeProvider>
        <View style={[styles.container, { paddingTop: insets.top }]}>
          {/* @todo: backgroundColor should be the same as the primary color and should be set using the var */}
          <Suspense fallback={<Fallback />}>
            <SQLiteProvider
              databaseName="test.db"
              onInit={migrateDbIfNeeded}
              useSuspense
            >
              <NavigationThemeProvider value={NativgationDarkTheme}>
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="add-group"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="profile"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </NavigationThemeProvider>
            </SQLiteProvider>
          </Suspense>
        </View>
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 80,
  },
});

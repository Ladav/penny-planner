import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { migrateDbIfNeeded } from "@/utils/db.utils";
import Fallback from "@/components/fallback";
import { ThemeProvider } from "@/components/theme-provider";

import "../styles/global.css";

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <ThemeProvider>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <StatusBar style="auto" />
        <Suspense fallback={<Fallback />}>
          <SQLiteProvider
            databaseName="test.db"
            onInit={migrateDbIfNeeded}
            useSuspense
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="create-group-modal"
                options={{ presentation: "modal", headerShown: false }}
              />
              <Stack.Screen
                name="create-expense-modal"
                options={{ presentation: "modal", headerShown: false }}
              />
            </Stack>
          </SQLiteProvider>
        </Suspense>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 80,
  },
});

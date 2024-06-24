import TabBarIcon from "@/components/tab-bar-icon";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
      <Tabs screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="groups"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "people" : "people-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>

  );
}

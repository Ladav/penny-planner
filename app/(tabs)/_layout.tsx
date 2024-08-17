import TabBarIcon from "@/components/tab-bar-icon";
import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} className="-mr-12" />
          ),
        }}
      />
      <Tabs.Screen
        name="add-expense"
        options={{
          tabBarIcon: () => (
            <View className="bg-primary -mt-8 rounded-full p-1.5">
              <AntDesign
                name="pluscircle"
                size={48}
                className="color-secondary bg-primary rounded-full"
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="team" color={color} className="-ml-12" />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="barchart" color={color} className="-ml-12" />
          ),
        }}
      />
    </Tabs>
  );
}

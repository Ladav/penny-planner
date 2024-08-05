import { Pressable, ScrollView, View } from "react-native";
import ThemedText from "@/components/themed-text";
import ThemedView from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Profile() {
  return (
    <View className="flex-1 items-center justify-center">
      <ThemedView className="flex flex-row items-center h-16 px-4 w-full">
        <View className="mr-4">
          <Link href="../" asChild>
            <Pressable>
              <Ionicons
                name="chevron-back-outline"
                size={24}
                className="text-secondary"
              />
            </Pressable>
          </Link>
        </View>
        <ThemedText className="text-xl font-medium">Profile</ThemedText>
      </ThemedView>
      <ScrollView>
        <View className="w-full h-72 flex items-center justify-center">
          <ThemedView className="border-secondary border-2 rounded-full p-4">
            <Ionicons
              name="person-outline"
              size={96}
              className="text-secondary"
            />
          </ThemedView>
          <ThemedText className="text-xl font-medium mt-4">Ladav</ThemedText>
        </View>
        <View className="flex-1 p-4 w-full">
          <ThemedText className="text-lg mb-2 tracking-wide text-secondary">
            PROFILE
          </ThemedText>
          <View>
            <View className="py-2 border-b border-primary-light">
              <ThemedText>Full Name</ThemedText>
              <ThemedText className="text-secondary">Davinder singh</ThemedText>
            </View>
            <View className="py-2 border-b border-primary-light">
              <ThemedText>Birthday</ThemedText>
              <ThemedText className="text-secondary">23 Feb, 1998</ThemedText>
            </View>
            <View className="py-2 border-b border-primary-light">
              <ThemedText>Email</ThemedText>
              <ThemedText className="text-secondary">
                ladav@gmail.com
              </ThemedText>
            </View>
            <View className="py-2">
              <ThemedText>Phone</ThemedText>
              <ThemedText className="text-secondary">+91 9876543210</ThemedText>
            </View>
          </View>
          <ThemedText className="text-lg my-2 tracking-wide text-secondary">
            Data & Privary
          </ThemedText>
          <View className="flex flex-col">
            <View className="py-2 border-b border-primary-light">
              <ThemedText>Data</ThemedText>
              <ThemedText className="text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores doloremque, doloribus dolores dolorum dolore, fugiat,
                ipsa, iure labore laboriosam magni minima molestiae nam neque
                nihil non nulla, odio, optio, quae, quia, quibusdam, quos,
                repellat, rerum sint, soluta, tempore, ut, velit, voluptas,
                voluptatum.
              </ThemedText>
            </View>
            <View className="py-2 border-b border-primary-light">
              <ThemedText>Privacy</ThemedText>
              <ThemedText className="text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores doloremque, doloribus dolores dolorum dolore, fugiat,
                ipsa, iure labore laboriosam magni minima molestiae nam neque
                nihil non nulla, odio, optio, quae, quia, quibusdam, quos,
                repellat, rerum sint, soluta, tempore, ut, velit, voluptas,
                voluptatum.
              </ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

import ThemedButton from "@/components/themed-button";
import ThemedTextInput from "@/components/themed-text-input";
import ThemedText from "@/components/themed-text";
import ThemedView from "@/components/themed-view";
import { useDBMutation } from "@/hooks/use-db-mutation";
import { createGroup } from "@/utils/db.utils";
import { basicTosatAndroid } from "@/utils/toast.utils";
import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, View } from "react-native";

export default function CreateGroupModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  const navigation = useNavigation();
  const createGroupM = useDBMutation(createGroup, {
    onSuccess: () => {
      setIsOpen(false);
      setTimeout(() => {
        navigation.goBack();
      }, 200);
      basicTosatAndroid("Group created");
    },
  });

  const handleSubmit = async () => {
    if (title) {
      await createGroupM.mutate(title);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <View className="flex-1">
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
          <ThemedText className="text-xl font-medium">Create Group</ThemedText>
        </ThemedView>
        <ThemedView className="m-4 p-4 rounded-lg shadow-lg shadow-secondary-light">
          <ThemedText className="mb-2">Group Name</ThemedText>
          <ThemedTextInput
            placeholder="Group Name"
            value={title}
            onChangeText={setTitle}
          />
          <ThemedButton
            label="Submit"
            className="mt-4"
            onPress={handleSubmit}
          />
        </ThemedView>
      </View>
    </Modal>
  );
}

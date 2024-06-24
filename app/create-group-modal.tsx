import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CreateGroupModal() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerIcon}>
            <Link href="../" asChild>
              <Pressable>
                <Ionicons name="chevron-back-outline" size={24} color="grey" />
              </Pressable>
            </Link>
          </View>
          <Text style={styles.headerText}>Create Group</Text>
        </View>
        <View>
          <Text>Title</Text>
          <TextInput placeholder="Title" />
          <Text>Amount</Text>
          <TextInput placeholder="Amount" />
          <View>
            <Text>Date</Text>
            <TextInput placeholder="Date" />
            <Text>Time</Text>
            <TextInput placeholder="Time" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerIcon: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

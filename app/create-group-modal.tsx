import DateTimePicker from "@/components/date-time-picker";
import NumberInput from "@/components/number-input";
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
        <View style={styles.formContainer}>
          <Text style={styles.formText}>Title</Text>
          <TextInput style={styles.formInput} placeholder="Title" />
          <Text style={styles.formText}>Amount</Text>
          <NumberInput style={styles.formInput} placeholder="Amount" />
          <DateTimePicker />
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
  formContainer: {
    padding: 16,
  },
  formText: {
    fontSize: 16,
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  datePickerText: {
    fontSize: 16,
    marginBottom: 8,
  },
  datePickerInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
});

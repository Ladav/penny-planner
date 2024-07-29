import ThemedCheckbox from "@/components/themed-checkbox";
import ThemedDateTimePicker from "@/components/themed-date-time-picker";
import ThemedTextInput from "@/components/themed-text-input";
import ThemedText from "@/components/themed-text";
import ThemedView from "@/components/themed-view";
import { useDBMutation } from "@/hooks/use-db-mutation";
import { useDBQuery } from "@/hooks/use-db-query";
import { createExpense, getAllExpenseGroups } from "@/utils/db.utils";
import { basicTosatAndroid } from "@/utils/toast.utils";
import { Ionicons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import ThemedNumberInput from "@/components/themed-number-input";
import { Picker } from "@react-native-picker/picker";
import ThemedSelectOption from "@/components/themed-select-option";

export default function CreateExpenseModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [isPaid, setIsPaid] = useState(false);
  const [expenseGroupId, setExpenseGroupId] = useState<number | null>(null);
  const navigation = useNavigation();
  const allExpenseGroupQ = useDBQuery(getAllExpenseGroups, {
    onSuccess: (data) => {
      if (data.length > 0) {
        setExpenseGroupId(data[0].id);
      }
    },
    defaultValue: [],
  });
  const createExpenseM = useDBMutation(createExpense, {
    onSuccess: () => {
      basicTosatAndroid("Expense added");
      setIsOpen(false);
      setTimeout(() => {
        navigation.goBack();
      }, 200);
    },
  });

  const handleSubmit = async () => {
    if (title && amount && date && expenseGroupId) {
      await createExpenseM.mutate({
        title,
        amount: Number(amount),
        date,
        isPaid,
        expenseGroupId,
      });
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
          <ThemedText className="text-xl font-medium">Add Expense</ThemedText>
        </ThemedView>
        <ThemedView className="m-4 p-4 gap-4 rounded-lg shadow-lg shadow-secondary-light">
          <View className="gap-2">
            <ThemedText>Expense Title</ThemedText>
            <ThemedTextInput
              placeholder="Expense Title"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View className="gap-2">
            <ThemedText>Amount</ThemedText>
            <ThemedNumberInput
              placeholder="Amount"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <ThemedDateTimePicker
            value={date}
            onChange={(_, selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />

          <ThemedCheckbox
            label="Already Paid"
            checked={isPaid}
            onPress={() => setIsPaid(!isPaid)}
          />

          <View>
            <ThemedText>Expense Group</ThemedText>
            <ThemedSelectOption
              options={allExpenseGroupQ.data!}
              value={expenseGroupId}
              onChange={setExpenseGroupId}
            />
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={expenseGroupId}
              onValueChange={(itemValue) => setExpenseGroupId(itemValue)}
            >
              {allExpenseGroupQ.data!.map((group) => (
                <Picker.Item
                  key={group.id}
                  value={group.id}
                  label={group.name}
                />
              ))}
            </Picker>
          </View>
          {/*

          <Pressable onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </Pressable> */}
        </ThemedView>
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
  checkboxContainer: {
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: "#ccc",
    marginBottom: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  submitText: {
    fontSize: 16,
    padding: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
});

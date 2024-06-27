import Checkbox from "@/components/checkbox";
import DateTimePicker from "@/components/date-time-picker";
import NumberInput from "@/components/number-input";
import { ExpenseGroup } from "@/types/db.types";
import { createExpense, getAllExpenseGroups } from "@/utils/db.utils";
import {
  basicTosatAndroid,
  commonErrorToastAndroid,
} from "@/utils/toast.utils";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Link, useFocusEffect, useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CreateExpenseModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [isPaid, setIsPaid] = useState(false);
  const [expenseGroupId, setExpenseGroupId] = useState<number | null>(null);
  const [allExpenseGroup, setAllExpenseGroup] = useState<ExpenseGroup[]>([]);

  const navigation = useNavigation();
  const db = useSQLiteContext();

  useFocusEffect(
    useCallback(() => {
      async function fetchGroups() {
        const result = await getAllExpenseGroups(db);
        setAllExpenseGroup(result);
      }
      fetchGroups();
    }, [])
  );

  const handleSubmit = async () => {
    if (title && amount && date && expenseGroupId) {
      try {
        await createExpense(db, {
          title,
          amount: Number(amount),
          date,
          isPaid,
          expenseGroupId,
        });
        basicTosatAndroid("Expense added");
        setIsOpen(false);
        setTimeout(() => {
          navigation.goBack();
        }, 200);
      } catch (error) {
        commonErrorToastAndroid();
      }
    }
  };

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
          <Text style={styles.headerText}>Add Expense</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formText}>Title</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.formText}>Amount</Text>
          <NumberInput
            style={styles.formInput}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
          />
          <DateTimePicker
            value={date}
            onChange={(_, selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
          <Checkbox
            label="Already Paid"
            checked={isPaid}
            onPress={() => setIsPaid(!isPaid)}
            constainerStyle={styles.checkboxContainer}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={expenseGroupId}
              onValueChange={(itemValue) => setExpenseGroupId(itemValue)}
            >
              {allExpenseGroup.map((group) => (
                <Picker.Item label={group.name} value={group.id} />
              ))}
            </Picker>
          </View>

          <Pressable onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </Pressable>
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

import ThemedCheckbox from "@/components/themed-checkbox";
import ThemedDateTimePicker from "@/components/themed-date-time-picker";
import ThemedTextInput from "@/components/themed-text-input";
import ThemedText from "@/components/themed-text";
import ThemedView from "@/components/themed-view";
import { useDBMutation } from "@/hooks/use-db-mutation";
import { useDBQuery } from "@/hooks/use-db-query";
import { createExpense, getAllExpenseGroups } from "@/utils/db.utils";
import { basicTosatAndroid } from "@/utils/toast.utils";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import ThemedNumberInput from "@/components/themed-number-input";
import ThemedSelectOption from "@/components/themed-select-option";
import ThemedButton from "@/components/themed-button";

export default function AddExpense() {
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
    <View className="flex-1 items-center justify-center pt-4">
      <View className="flex flex-row items-center justify-between h-16 px-4 w-full">
        <ThemedText className="text-2xl font-medium">Add Expense</ThemedText>
      </View>
      <View className="flex-1 w-full gap-4 mt-4 px-4">
        <ThemedView className="p-4 gap-4 rounded-lg shadow-lg shadow-secondary-light">
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

          <View className="gap-2">
            <ThemedText>Expense Group</ThemedText>
            <ThemedSelectOption
              options={allExpenseGroupQ.data!}
              value={expenseGroupId}
              onChange={setExpenseGroupId}
            />
          </View>

          <ThemedButton label="Submit" onPress={handleSubmit} />
        </ThemedView>
      </View>
    </View>
  );
}

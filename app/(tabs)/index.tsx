import BasicCard from "@/components/basic-card";
import ThemedText from "@/components/themed-text";
import ThemedView from "@/components/themed-view";
import { useDBQuery } from "@/hooks/use-db-query";
import { useFocusDBQuery } from "@/hooks/use-focus-db-query";
import {
  getMostRecentlyUsedExpenseGroups,
  getRecentTransactions,
  getTotalExpenseThisMonth,
  getTotalExpenseUserOwes,
  getVersion,
} from "@/utils/db.utils";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

export default function Home() {
  const versionQ = useDBQuery(getVersion);
  const totalExpenseThisMonthQ = useFocusDBQuery(getTotalExpenseThisMonth);
  const totalExpenseUserOwesQ = useFocusDBQuery(getTotalExpenseUserOwes);
  const mostRecentlyUsedExpenseGroups = useFocusDBQuery(
    getMostRecentlyUsedExpenseGroups
  );
  const recentTransactionsQ = useFocusDBQuery(getRecentTransactions, {
    params: { fromLastNDays: 17 },
  });

  return (
    <View className="flex-1 items-center justify-center pt-4">
      <View className="flex flex-row items-center justify-between h-16 px-4 w-full">
        <ThemedView className="border-secondary border-2 rounded-full p-2">
          <Ionicons
            name="person-outline"
            size={30}
            className="text-secondary"
          />
        </ThemedView>
        {/* <ThemedText>SQLite version: {versionQ.data}</ThemedText> */}
        <Link href="/create-expense-modal" asChild>
          <Pressable className="flex flex-row items-center rounded-full bg-primary-light -z-10 gap-2">
            <Ionicons
              name="add-circle"
              size={30}
              className="-ml-4 color-secondary bg-primary rounded-full"
            />
            <ThemedText className="mr-4 font-medium">Add Expense</ThemedText>
          </Pressable>
        </Link>
      </View>
      <View className="flex-1 w-full gap-4 mt-4 px-4">
        <View>
          <ThemedText>Total expenses this month</ThemedText>
          <ThemedText className="font-medium text-3xl mt-1">
            ${(totalExpenseThisMonthQ.data ?? 110).toFixed(2)}
          </ThemedText>
        </View>
        <View className="w-full flex flex-row items-center justify-evenly gap-4">
          <BasicCard title="You owe" value={totalExpenseUserOwesQ.data ?? 0} />
          {/* <BasicCard title="Owes you" value={80} /> */}
        </View>
        <ThemedText className="text-xl">Quick Access</ThemedText>
        <FlatList
          data={mostRecentlyUsedExpenseGroups.data ?? []}
          horizontal
          scrollEnabled
          className=""
          renderItem={({ item }) => (
            <BasicCard
              title={item.name}
              value={item.totalExpense}
              cardStyles={styles.quickAccessItem}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <ThemedText className="text-xl">Recent Transactions</ThemedText>
        <FlatList
          data={recentTransactionsQ.data ?? []}
          scrollEnabled
          style={styles.recentTransactionsList}
          renderItem={({ item }) => (
            <BasicCard
              title={item.title}
              value={item.amount}
              cardStyles={styles.recentTransactionsItem}
              containerClassName="pb-4"
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quickAccessItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginRight: 16,
  },
  recentTransactionThemedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007aff",
    marginTop: 16,
  },
  recentTransactionsList: {
    marginTop: 16,
  },
  recentTransactionsItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 16,
  },
});

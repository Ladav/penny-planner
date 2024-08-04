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
import { useMemo } from "react";
import { FlatList, Pressable, View } from "react-native";

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

  const totalExpenseThisMonthContent = useMemo(() => {
    if (totalExpenseThisMonthQ.isLoading) {
      return (
        <>
          <ThemedText>Total expenses this month</ThemedText>
          <ThemedText className="font-medium text-3xl">...</ThemedText>
        </>
      );
    }

    if (totalExpenseThisMonthQ.error) {
      return <ThemedText>Error: {totalExpenseThisMonthQ.error}</ThemedText>;
    }

    if (totalExpenseThisMonthQ.data) {
      return (
        <>
          <ThemedText>Total expenses this month</ThemedText>
          <ThemedText className="font-medium text-3xl">
            ${(totalExpenseThisMonthQ.data ?? 110).toFixed(2)}
          </ThemedText>
        </>
      );
    }

    return null;
  }, [
    totalExpenseThisMonthQ.data,
    totalExpenseThisMonthQ.error,
    totalExpenseThisMonthQ.isLoading,
  ]);

  const quickAccessContent = useMemo(() => {
    if (mostRecentlyUsedExpenseGroups.isLoading) {
      return <ThemedText>Loading...</ThemedText>;
    }

    if (mostRecentlyUsedExpenseGroups.error) {
      return (
        <ThemedText>Error: {mostRecentlyUsedExpenseGroups.error}</ThemedText>
      );
    }

    if (mostRecentlyUsedExpenseGroups.data) {
      return (
        <>
          <ThemedText className="text-xl">Quick Access</ThemedText>
          <FlatList
            data={mostRecentlyUsedExpenseGroups.data ?? []}
            horizontal
            scrollEnabled
            className="flex-grow-0 -mb-4"
            contentContainerClassName="gap-4"
            renderItem={({ item }) => (
              <BasicCard
                title={item.name}
                value={item.totalExpense}
                className="mb-4"
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      );
    }

    return null;
  }, [
    mostRecentlyUsedExpenseGroups.data,
    mostRecentlyUsedExpenseGroups.error,
    mostRecentlyUsedExpenseGroups.isLoading,
  ]);

  const recentTransctionsContent = useMemo(() => {
    if (recentTransactionsQ.isLoading) {
      return <ThemedText>Loading...</ThemedText>;
    }

    if (recentTransactionsQ.error) {
      return <ThemedText>Error: {recentTransactionsQ.error}</ThemedText>;
    }

    if (recentTransactionsQ.data) {
      return (
        <>
          <ThemedText className="text-xl">Recent Transactions</ThemedText>
          <FlatList
            data={recentTransactionsQ.data ?? []}
            scrollEnabled
            renderItem={({ item }) => (
              <BasicCard
                title={item.title}
                value={item.amount}
                containerClassName="pb-4"
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      );
    }

    return null;
  }, [
    recentTransactionsQ.data,
    recentTransactionsQ.error,
    recentTransactionsQ.isLoading,
  ]);

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
        {totalExpenseThisMonthContent}
        <View className="w-full flex flex-row items-center justify-evenly gap-4">
          <BasicCard title="You owe" value={totalExpenseUserOwesQ.data ?? 0} />
        </View>
        {quickAccessContent}
        {recentTransctionsContent}
      </View>
    </View>
  );
}

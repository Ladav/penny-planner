import BasicCard from "@/components/basic-card";
import SkeletonItem from "@/components/skeleton";
import ThemedText from "@/components/themed-text";
import ThemedView from "@/components/themed-view";
import { useFocusDBQuery } from "@/hooks/use-focus-db-query";
import {
  getMostRecentlyUsedExpenseGroups,
  getRecentTransactions,
  getTotalExpenseThisMonth,
  getTotalExpenseUserOwes,
} from "@/utils/db.utils";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useMemo } from "react";
import { FlatList, Pressable, View } from "react-native";

export default function Home() {
  const totalExpenseThisMonthQ = useFocusDBQuery(getTotalExpenseThisMonth);
  const totalExpenseUserOwesQ = useFocusDBQuery(getTotalExpenseUserOwes);
  const mostRecentlyUsedExpenseGroups = useFocusDBQuery(
    getMostRecentlyUsedExpenseGroups
  );
  const recentTransactionsQ = useFocusDBQuery(getRecentTransactions, {
    params: { fromLastNDays: 17 },
  });

  const quickAccessContent = useMemo(() => {
    if (mostRecentlyUsedExpenseGroups.isLoading) {
      return (
        <FlatList
          data={[0, 2]}
          horizontal
          scrollEnabled
          className="flex-grow-0 -mb-4"
          contentContainerClassName="gap-4"
          renderItem={() => <SkeletonItem className="mb-4 h-24 w-24" />}
          keyExtractor={String}
        />
      );
    }

    if (mostRecentlyUsedExpenseGroups.error) {
      return (
        <ThemedText>Error: {mostRecentlyUsedExpenseGroups.error}</ThemedText>
      );
    }

    if (mostRecentlyUsedExpenseGroups.data) {
      return (
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
      return (
        <FlatList
          data={[1, 2]}
          scrollEnabled
          renderItem={() => <SkeletonItem className="mb-4 h-24" />}
          keyExtractor={String}
        />
      );
    }

    if (recentTransactionsQ.error) {
      return <ThemedText>Error: {recentTransactionsQ.error}</ThemedText>;
    }

    if (recentTransactionsQ.data) {
      return (
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
        <Link href="/profile" asChild>
          <Pressable className="flex flex-row items-center rounded-full bg-primary-light -z-10 gap-2">
            <ThemedView className="border-secondary border-2 rounded-full p-2">
              <Ionicons
                name="person-outline"
                size={30}
                className="text-secondary"
              />
            </ThemedView>
          </Pressable>
        </Link>
        <Link href="/(tabs)/add-expense" asChild>
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
        <View className="gap-2">
          <ThemedText>Total expenses this month</ThemedText>
          <ThemedText className="font-medium text-3xl">
            ${(totalExpenseThisMonthQ.data ?? 0).toFixed(2)}
          </ThemedText>
        </View>

        <View className="w-full flex flex-row items-center justify-evenly gap-4">
          <BasicCard title="You owe" value={totalExpenseUserOwesQ.data ?? 0} />
        </View>

        <ThemedText className="text-xl">Quick Access</ThemedText>
        {quickAccessContent}

        <ThemedText className="text-xl">Recent Transactions</ThemedText>
        {recentTransctionsContent}
      </View>
    </View>
  );
}

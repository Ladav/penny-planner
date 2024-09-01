// @todo: add sorting/filters options
import BasicCard from "@/components/basic-card";
import { useFocusDBQuery } from "@/hooks/use-focus-db-query";
import {
  getAllExpenseGroupsWithTotalExpenses,
  getTotalExpenseUserOwes,
} from "@/utils/db.utils";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { sum } from "radash";
import ThemedText from "@/components/themed-text";
import { useMemo } from "react";
import SkeletonItem from "@/components/skeleton";

export default function Groups() {
  const groupsQ = useFocusDBQuery(getAllExpenseGroupsWithTotalExpenses, {
    defaultValue: [],
  });
  // @todo: use a inifinite scroll view instead of flatlist
  const totalExpenseUserOwesQ = useFocusDBQuery(getTotalExpenseUserOwes, {
    defaultValue: 0,
  });
  const totalExpense = sum(groupsQ.data!, (group) => group.totalExpense);

  const groupsContent = useMemo(() => {
    if (groupsQ.isLoading) {
      return (
        <FlatList
          data={[1, 2]}
          scrollEnabled
          contentContainerClassName="px-4"
          renderItem={() => <SkeletonItem className="mb-4 h-24" />}
          keyExtractor={String}
        />
      );
    }

    if (groupsQ.error) {
      return <ThemedText>Error: {groupsQ.error}</ThemedText>;
    }

    if (groupsQ.data) {
      return (
        <FlatList
          data={groupsQ.data!}
          scrollEnabled
          contentContainerClassName="px-4"
          renderItem={({ item }) => (
            <BasicCard
              title={item.name}
              value={item.totalExpense ?? 0}
              containerClassName="pb-4"
            />
          )}
          keyExtractor={(item) => item.name}
        />
      );
    }

    return null;
  }, [groupsQ.data, groupsQ.error, groupsQ.isLoading]);

  return (
    <View className="flex-1 items-center justify-center pt-4">
      <View className="flex flex-row items-center justify-between h-16 px-4 w-full">
        <ThemedText className="text-2xl font-medium">Groups</ThemedText>
        <Link href="/add-group" asChild>
          <Pressable className="flex flex-row items-center rounded-full bg-primary-light -z-10 gap-2">
            <Ionicons
              name="add-circle"
              size={30}
              className="-ml-4 color-secondary bg-primary rounded-full"
            />
            <ThemedText className="mr-4 font-medium">Add Group</ThemedText>
          </Pressable>
        </Link>
      </View>
      <View className="flex-1 w-full gap-4 mt-4">
        <ThemedText className="px-4">You owe</ThemedText>
        <Text className="px-4">
          <ThemedText className="font-medium text-3xl">
            ${totalExpenseUserOwesQ.data ?? 0}
          </ThemedText>
          <ThemedText> / ${totalExpense}</ThemedText>
        </Text>

        <ThemedText className="text-xl px-4">All Groups</ThemedText>
        {groupsContent}
      </View>
    </View>
  );
}

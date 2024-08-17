import { useFocusDBQuery } from "@/hooks/use-focus-db-query";
import { getAllExpenseGroupsWithTotalExpensesAndTotalPaid } from "@/utils/db.utils";
import { ScrollView, View } from "react-native";
import ThemedText from "@/components/themed-text";
import { useMemo } from "react";
import ThemedView from "@/components/themed-view";
import StackedBarChart, {
  StackedBarChartProps,
} from "@/components/stacked-bar-chart";

export default function Statistics() {
  const groupsQ = useFocusDBQuery(
    getAllExpenseGroupsWithTotalExpensesAndTotalPaid,
    {
      defaultValue: [],
    }
  );

  const barChartData: StackedBarChartProps["data"] = useMemo(() => {
    if (groupsQ.data) {
      return groupsQ.data.map((group) => ({
        x: group.name,
        y1: Math.floor((group.totalExpense ?? 0) - (group.totalPaid ?? 0)),
        y2: Math.floor(group.totalPaid ?? 0),
      }));
    }

    return [];
  }, [groupsQ.data]);

  console.log(barChartData);

  return (
    <View className="flex-1 items-center justify-center pt-4">
      <View className="flex flex-row items-center justify-between h-16 px-4 w-full">
        <ThemedText className="text-2xl font-medium">Statistics</ThemedText>
      </View>
      <ScrollView className="flex-1 w-full gap-4 mt-4 px-4">
        <ThemedView>
          <StackedBarChart
            isLoading={groupsQ.isLoading}
            error={groupsQ.error}
            data={barChartData}
          />
        </ThemedView>
      </ScrollView>
    </View>
  );
}

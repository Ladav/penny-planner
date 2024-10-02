import { useFocusDBQuery } from "@/hooks/use-focus-db-query";
import {
  getAllExpenseGroupsWithTotalExpensesAndTotalPaid,
  getTotalAmountPaidAndDueOnPerDay,
} from "@/utils/db.utils";
import { ScrollView, View } from "react-native";
import ThemedText from "@/components/themed-text";
import { useMemo } from "react";
import ThemedView from "@/components/themed-view";
import StackedBarChart, {
  StackedBarChartProps,
} from "@/components/stacked-bar-chart";
import LinesChart, { LinesChartProps } from "@/components/lines-chart";
import { group, sum } from "radash";

export default function Statistics() {
  const groupVisePaidAndTotalExpenseQ = useFocusDBQuery(
    getAllExpenseGroupsWithTotalExpensesAndTotalPaid,
    { defaultValue: [] }
  );
  const totalPaidAndDuePerDayQ = useFocusDBQuery(
    getTotalAmountPaidAndDueOnPerDay,
    { defaultValue: [] }
  );

  const barChartData: StackedBarChartProps["data"] = useMemo(() => {
    if (groupVisePaidAndTotalExpenseQ.data) {
      return groupVisePaidAndTotalExpenseQ.data
        .filter((group) => ![0, null].includes(group.totalExpense))
        .map((group) => ({
          x: group.name,
          y1: Math.floor((group.totalExpense ?? 0) - (group.totalPaid ?? 0)),
          y1Name: "Remaining",
          y2: group.totalPaid ?? 0,
          y2Name: "Paid",
        }));
    }

    return [];
  }, [groupVisePaidAndTotalExpenseQ.data]);

  const lineChartData: LinesChartProps["data"] = useMemo(() => {
    if (totalPaidAndDuePerDayQ.data) {
      const labels: Array<string> = [];
      const data: Array<number[]> = [[], []];

      const dataGroupByDate = group(
        totalPaidAndDuePerDayQ.data,
        (item) => item.date
      );
      Object.entries(dataGroupByDate).forEach(([key, value]) => {
        labels.push(key);
        data[0].push(sum(value ?? [], (item) => item.amountDue));
        data[1].push(sum(value ?? [], (item) => item.amountPaid));
      });

      return { labels, data };
    }

    return { labels: [], data: [] };
  }, [totalPaidAndDuePerDayQ.data]);

  return (
    <View className="flex-1 items-center justify-center pt-4">
      <View className="flex flex-row items-center justify-between h-16 px-4 w-full">
        <ThemedText className="text-2xl font-medium">Statistics</ThemedText>
      </View>
      <ScrollView className="flex-1 w-full gap-4 my-4 px-4">
        <ThemedView className="rounded-lg overflow-hidden shadow-lg shadow-secondary-light">
          <StackedBarChart
            isLoading={groupVisePaidAndTotalExpenseQ.isLoading}
            error={groupVisePaidAndTotalExpenseQ.error}
            data={barChartData}
          />
        </ThemedView>
        <ThemedView className="rounded-lg overflow-hidden shadow-lg shadow-secondary-light mt-4">
          <LinesChart
            isLoading={groupVisePaidAndTotalExpenseQ.isLoading}
            error={groupVisePaidAndTotalExpenseQ.error}
            data={lineChartData}
          />
        </ThemedView>
      </ScrollView>
    </View>
  );
}

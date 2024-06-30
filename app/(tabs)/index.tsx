import BasicCard from "@/components/basic-card";
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
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const versionQ = useDBQuery(getVersion);
  const totalExpenseThisMonthQ = useFocusDBQuery(getTotalExpenseThisMonth);
  const totalExpenseUserOwesQ = useFocusDBQuery(getTotalExpenseUserOwes);
  const mostRecentlyUsedExpenseGroups = useFocusDBQuery(
    getMostRecentlyUsedExpenseGroups
  );
  const recentTransactionsQ = useFocusDBQuery(getRecentTransactions, {
    params: { fromLastNDays: 7 }
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="person-outline" size={30} color="grey" />
        <Text>SQLite version: {versionQ.data}</Text>
        <View style={styles.headerNewGroupContainer}>
          <Link href="/create-expense-modal" asChild>
            <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="add-circle-outline"
                size={30}
                color="grey"
                style={styles.headerNewGroupIcon}
              />
              <Text style={styles.headerNewGroupText}>Add Expense</Text>
            </Pressable>
          </Link>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.totalExpenseContainer}>
          <Text style={styles.totalExpenseText}>Total Expenses This Month</Text>
          <Text style={styles.totalExpenseValue}>
            $ {totalExpenseThisMonthQ.data ?? 0}
          </Text>
        </View>
        <View style={styles.balanceContainer}>
          <BasicCard
            title="You owe"
            value={totalExpenseUserOwesQ.data ?? 0}
            cardStyles={styles.balanceItem}
          />
          {/* <BasicCard
            title="Owes you"
            value={80}
            cardStyles={styles.balanceItem}
          /> */}
        </View>
        <Text style={styles.quickAccessText}>Quick Access</Text>
        <FlatList
          data={mostRecentlyUsedExpenseGroups.data ?? []}
          horizontal
          scrollEnabled
          style={styles.quickAccessList}
          renderItem={({ item }) => (
            <BasicCard
              title={item.name}
              value={item.totalExpense}
              cardStyles={styles.quickAccessItem}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <Text style={styles.recentTransactionText}>Recent Transactions</Text>
        <FlatList
          data={recentTransactionsQ.data ?? []}
          scrollEnabled
          style={styles.recentTransactionsList}
          renderItem={({ item }) => (
            <BasicCard
              title={item.title}
              value={item.amount}
              cardStyles={styles.recentTransactionsItem}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    backgroundColor: "#eee",
  },
  headerNewGroupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 4,
    backgroundColor: "#eee",
  },
  headerNewGroupIcon: {
    marginLeft: -16,
  },
  headerNewGroupText: {
    marginLeft: 8,
  },
  mainContainer: {
    flex: 1,
    width: "100%",
  },
  totalExpenseContainer: {
    marginTop: 16,
  },
  totalExpenseText: {},
  totalExpenseValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007aff",
  },
  balanceContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 26,
  },
  balanceItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
    borderRadius: 16,
    flexGrow: 1,
  },
  quickAccessText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007aff",
    marginTop: 16,
  },
  quickAccessList: {
    flexGrow: 0,
    flexShrink: 0,
    paddingVertical: 16,
  },
  quickAccessItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginRight: 16,
  },
  recentTransactionText: {
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

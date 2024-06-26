import BasicCard from "@/components/basic-card";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const RecentlyUpdatedGroups = [
  { title: "Home", value: 100 },
  { title: "Work", value: 80 },
  { title: "Travel", value: 70 },
  { title: "Food", value: 60 },
  { title: "Entertainment", value: 50 },
];

const RecentTransactions = [
  {
    id: 0,
    title: "Groceries",
    amount: 100,
    date: "2022-01-01",
  },
  {
    id: 1,
    title: "Rent",
    amount: 200,
    date: "2022-01-02",
  },
  {
    id: 2,
    title: "Gas",
    amount: 300,
    date: "2022-01-03",
  },
  {
    id: 3,
    title: "Breakfast",
    amount: 400,
    date: "2022-01-04",
  },
  {
    id: 4,
    title: "Dinner",
    amount: 400,
    date: "2022-01-05",
  },
];

export default function Home() {
  const db = useSQLiteContext();
  const [version, setVersion] = useState("");
  useEffect(() => {
    async function setup() {
      const result = await db.getFirstAsync<{ "sqlite_version()": string }>(
        "SELECT sqlite_version()"
      );
      setVersion(result?.["sqlite_version()"] ?? "0");
    }
    setup();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="person-outline" size={30} color="grey" />
        <Text>SQLite version: {version}</Text>
        <View style={styles.headerNewGroupContainer}>
          <Link href="/create-group-modal" asChild>
            <Pressable>
              <Ionicons
                name="add-circle-outline"
                size={30}
                color="grey"
                style={styles.headerNewGroupIcon}
              />
            </Pressable>
          </Link>
          <Text style={styles.headerNewGroupText}>New Group</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.totalExpenseContainer}>
          <Text style={styles.totalExpenseText}>Total Expenses This Month</Text>
          <Text style={styles.totalExpenseValue}>$ 100</Text>
        </View>
        <View style={styles.balanceContainer}>
          <BasicCard
            title="You owe"
            value={100}
            cardStyles={styles.balanceItem}
          />
          <BasicCard
            title="Owes you"
            value={80}
            cardStyles={styles.balanceItem}
          />
        </View>
        <Text style={styles.quickAccessText}>Quick Access</Text>
        <FlatList
          data={RecentlyUpdatedGroups}
          horizontal
          scrollEnabled
          style={styles.quickAccessList}
          renderItem={({ item }) => (
            <BasicCard
              title={item.title}
              value={item.value}
              cardStyles={styles.quickAccessItem}
            />
          )}
          keyExtractor={(item) => item.title}
        />
        <Text style={styles.recentTransactionText}>All Transactions</Text>
        <FlatList
          data={RecentTransactions}
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

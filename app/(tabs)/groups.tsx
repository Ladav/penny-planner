import BasicCard from "@/components/basic-card";
import { ExpenseGroupWithTotal } from "@/types/db.types";
import { getAllExpenseGroupsWithTotalExpenses } from "@/utils/db.utils";
import { Ionicons } from "@expo/vector-icons";
import { Link, useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Groups() {
  const db = useSQLiteContext();
  const [groups, setGroups] = useState<ExpenseGroupWithTotal[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchGroups() {
        const result = await getAllExpenseGroupsWithTotalExpenses(db);
        setGroups(result);
      }
      fetchGroups();
    }, [])
  );

  const totalExpense = groups.reduce<number>(
    (acc, group) => acc + group.totalExpense,
    0
  );
  // Todo: Get you owe from database
  const youOwe = 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerContianer}>
        <Text style={styles.headerText}>Groups</Text>
        <Link href="/create-group-modal" asChild>
          <Pressable>
            <Ionicons size={24} name="add-circle-outline" />
          </Pressable>
        </Link>
      </View>
      <View style={styles.statsContainer}>
        <Text style={{ fontSize: 16, fontWeight: "bold", paddingVertical: 8 }}>
          Groups
        </Text>
        <View style={styles.statsDivider} />
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 8,
            }}
          >
            <View>
              <Text>
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                  ${youOwe}{" "}
                </Text>
                / ${totalExpense}
              </Text>
              <Text>You owed</Text>
            </View>
            <Pressable onPress={() => {}}>
              <Text>Analyse</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          paddingVertical: 8,
          marginTop: 16,
        }}
      >
        Groups
      </Text>

      <FlatList
        data={groups}
        scrollEnabled
        style={styles.groupList}
        renderItem={({ item }) => (
          <BasicCard
            title={item.name}
            value={item.totalExpense}
            cardStyles={styles.groupItem}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContianer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    backgroundColor: "#eee",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007aff",
  },
  toggleButtonContainer: {
    flexDirection: "row",
    borderRadius: 16,
    marginTop: 24,
    width: "100%",
    backgroundColor: "#eee",
    gap: 16,
  },
  toggleButton: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 24,
    backgroundColor: "#007aff",
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  statsContainer: {
    marginTop: 16,
    padding: 8,
    borderRadius: 16,
    backgroundColor: "#ccc",
  },
  statsDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "#007aff",
  },
  groupList: {
    marginTop: 16,
  },
  groupItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 16,
  },
});

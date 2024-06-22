import BasicCard from "@/components/basic-card";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";

const recentlyUpdatedGroups = [
  { title: "Home", value: 100 },
  { title: "Work", value: 80 },
  { title: "Travel", value: 70 },
  { title: "Food", value: 60 },
  { title: "Entertainment", value: 50 },
];

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Ionicons name="person-outline" size={30} color="grey" />
        <View style={styles.headerNewGroupContainer}>
          <Ionicons
            name="add-circle"
            size={30}
            color="grey"
            style={styles.headerNewGroupIcon}
          />
          <Text style={styles.headerNewGroupText}>New Group</Text>
        </View>
      </View>
      {/* Main Section */}
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
          data={recentlyUpdatedGroups}
          horizontal
          scrollEnabled
          style={{height: 86}}
          contentContainerStyle={styles.quickAccessContainer}
          renderItem={({ item }) => (
            <BasicCard
              title={item.title}
              value={item.value}
              cardStyles={styles.quickAccessItem}
            />
          )}
          keyExtractor={(item) => item.title}
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
  quickAccessContainer: {
    height: 86,
    marginTop: 16,
  },
  quickAccessItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginRight: 16,
    borderRadius: 16,
  },
});

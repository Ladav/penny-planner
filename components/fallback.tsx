import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Fallback() {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <Text style={{ marginTop: 16 }}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});

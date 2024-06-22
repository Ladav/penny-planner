import { View, Text, StyleSheet } from "react-native";

export default function BasicCard({
  title,
  value,
  cardStyles,
}: {
  title: string;
  value: number;
  cardStyles?: any;
}) {
  return (
    <View style={[styles.container, cardStyles]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{`$ ${value}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#aaa",
  },
  title: {
    fontSize: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

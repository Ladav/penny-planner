import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

export default function Checkbox({
  label,
  checked,
  onPress,
  constainerStyle,
}: {
  label: string;
  checked: boolean;
  onPress: () => void;
  constainerStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.container, constainerStyle]}>
      <Text style={styles.checkboxLabel}>{label}</Text>
      {
        <Ionicons
          name="checkmark-circle"
          size={24}
          style={checked ? styles.checkboxActive : styles.checkboxInactive}
        />
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxActive: {
    width: 24,
    height: 24,
    borderRadius: 100,
    color: "coral",
  },
  checkboxInactive: {
    width: 24,
    height: 24,
    borderRadius: 100,
    color: "grey",
  },
  checkboxLabel: {
    fontSize: 16,
    marginRight: 8,
  },
});

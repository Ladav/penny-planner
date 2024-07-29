import { Ionicons } from "@expo/vector-icons";
import { Pressable, PressableProps } from "react-native";
import ThemedText from "./themed-text";
import clsx from "clsx";

export default function ThemedCheckbox({
  label,
  checked,
  onPress,
  className,
  ...props
}: PressableProps & {
  label: string;
  checked: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={clsx("flex-row items-center gap-2", className)}
      {...props}
    >
      <ThemedText>{label}</ThemedText>
      {
        <Ionicons
          name="checkmark-circle"
          size={24}
          className={clsx(checked ? "text-secondary" : "text-grey")}
        />
      }
    </Pressable>
  );
}

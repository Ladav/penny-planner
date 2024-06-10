import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { ComponentProps } from "react";

export default function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return <Ionicons size={24} style={[{ marginBottom: 3 }, style]} {...rest} />;
}

import { AntDesign } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { ComponentProps } from "react";

export default function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof AntDesign>["name"]>) {
  return <AntDesign size={24} style={[{ marginBottom: 3 }, style]} {...rest} />;
}

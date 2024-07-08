import clsx from "clsx";
import { ComponentProps } from "react";
import { View } from "react-native";

export default function ThemedView({
  className,
  children,
  ...props
}: ComponentProps<typeof View>) {
  return (
    <View className={clsx("bg-primary-light", className)} {...props}>
      {children}
    </View>
  );
}

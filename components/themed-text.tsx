import clsx from "clsx";
import { ComponentProps } from "react";
import { Text } from "react-native";

export default function ThemedText({
  className,
  children,
  ...props
}: ComponentProps<typeof Text>) {
  return (
    <Text className={clsx("text-light", className)} {...props}>
      {children}
    </Text>
  );
}

import { Pressable, PressableProps } from "react-native";
import ThemedText from "./themed-text";
import clsx from "clsx";

export default function ThemedButton({
  label,
  className,
  ...props
}: Exclude<PressableProps, "children"> & { label: string }) {
  return (
    <Pressable
      {...props}
      className={clsx(
        "w-full max-w-60 text-light py-2 px-4 rounded-lg border border-secondary-light items-center justify-center bg-primary",
        className
      )}
    >
      <ThemedText>{label}</ThemedText>
    </Pressable>
  );
}

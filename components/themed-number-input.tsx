import clsx from "clsx";
import { TextInput, TextInputProps } from "react-native";

export default function ThemedNumberInput({
  className,
  children,
  ...props
}: TextInputProps) {
  return (
    <TextInput
      {...props}
      className={clsx(
        "text-light border py-2 px-4 border-secondary rounded",
        className
      )}
      placeholderClassName="text-secondary-light"
    />
  );
}

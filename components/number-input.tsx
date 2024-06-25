import { TextInput, TextInputProps } from "react-native";

export default function NumberInput(
  props: Exclude<TextInputProps, "keyboardType">
) {
  function validate(value: string) {
    const regex = /^[0-9]*$/;
    return regex.test(value);
  }

  function onChangeText(value: string) {
    if (validate(value) && props.onChangeText) {
      props.onChangeText(value);
    }
  }

  return (
    <TextInput
      keyboardType="numeric"
      {...props}
      {...(props?.onChangeText ? { onChangeText } : {})}
    />
  );
}

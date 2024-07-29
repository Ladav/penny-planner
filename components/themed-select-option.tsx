import { Picker } from "@react-native-picker/picker";
import ThemedView from "./themed-view";

export default function ThemedSelectOption<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { id: T; name: string }[];
  value: T | null;
  onChange: (value: T | null) => void;
}) {
  return (
    <ThemedView>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue)}
      >
        {options.map((option) => (
          <Picker.Item key={option.id} value={option.id} label={option.name} />
        ))}
      </Picker>
    </ThemedView>
  );
}

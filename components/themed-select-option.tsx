// Todo: fix the pop-menu background color
import { Picker } from "@react-native-picker/picker";
import ThemedView from "./themed-view";
import clsx from "clsx";
import { themesColors } from "@/utils/color-theme.utils";
import { useState } from "react";

export default function ThemedSelectOption<T extends string | number>({
  options,
  value,
  onChange,
  className,
}: {
  options: { id: T; name: string }[];
  value: T | null;
  onChange: (value: T | null) => void;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ThemedView
      className={clsx(
        "text-light border border-secondary bg-primary rounded",
        className
      )}
    >
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue)}
        dropdownIconColor={themesColors.dark["color-secondary-light"]}
        dropdownIconRippleColor={themesColors.dark["color-secondary-light"]}
      >
        {options.map((option) => (
          <Picker.Item
            key={option.id}
            value={option.id}
            label={option.name}
            style={{
              color: themesColors.dark["color-light-default"],
              backgroundColor: themesColors.dark["color-primary-light"],
            }}
          />
        ))}
      </Picker>
    </ThemedView>
  );
}

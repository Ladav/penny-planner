import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RNDateTimePicker, {
  AndroidNativeProps,
  DateTimePickerEvent,
  BaseProps,
} from "@react-native-community/datetimepicker";

export default function DateTimePicker({
  value,
  onChange,
  defaultDate,
  ...props
}: Partial<BaseProps> & { defaultDate?: Date }) {
  const [internalValue, setInternalValue] = useState(defaultDate ?? new Date());
  const [mode, setMode] = useState<AndroidNativeProps["mode"]>("date");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (value) {
      setInternalValue(value);
    }
  }, [value]);

  const handleOnChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setInternalValue(selectedDate);

      if (onChange) {
        onChange(_, selectedDate);
      }
    }
  };

  const showMode = (currentMode: AndroidNativeProps["mode"]) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <>
      {show && (
        <RNDateTimePicker
          is24Hour={true}
          mode={mode}
          {...props}
          value={internalValue}
          onChange={handleOnChange}
        />
      )}
      <View style={styles.continer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerText}>Date</Text>
          <Pressable onPress={showDatepicker}>
            <Text style={styles.pickerValue}>{`${internalValue.getDate()}/${
              internalValue.getMonth() + 1
            }/${internalValue.getFullYear()}`}</Text>
          </Pressable>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerText}>Time</Text>
          <Pressable onPress={showTimepicker}>
            <Text
              style={styles.pickerValue}
            >{`${internalValue.getHours()}:${internalValue.getMinutes()}`}</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  continer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pickerContainer: {},
  pickerText: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerValue: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
    fontSize: 24,
  },
});

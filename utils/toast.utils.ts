import { ToastAndroid } from "react-native";

export function basicTosatAndroid(message: string) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}

export function commonErrorToastAndroid() {
  ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
}

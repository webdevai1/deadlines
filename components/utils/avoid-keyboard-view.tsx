import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

type AvoidKeyboardViewProps = {
  children: ReactNode;
};
export default function AvoidKeyboardView({
  children,
}: AvoidKeyboardViewProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

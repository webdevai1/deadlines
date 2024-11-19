import { GestureHandlerRootView } from "react-native-gesture-handler";

type GestureHandlerProviderProps = {
  children: React.ReactNode;
};
export default function GestureHandlerProvider({
  children,
}: GestureHandlerProviderProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {children}
    </GestureHandlerRootView>
  );
}

import { Stack } from "expo-router";
import { FloatingMenu } from "@/components/navigation/floating-menu";
export default function AppLayout() {
  return (
    <>
      <Stack screenOptions={{ animation: "fade", headerShown: false }} />
      <FloatingMenu />
    </>
  );
}

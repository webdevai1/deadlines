import { Redirect } from "expo-router";
import { useSelector } from "@/store/hooks";
import { ROUTES } from "@/constants/routes";

export default function Index() {
  const isShown = useSelector((state) => state.welcomeScreen.isShown);
  if (isShown) {
    return <Redirect href={ROUTES.HOME} />;
  }
  return <Redirect href={ROUTES.WELCOME_SCREEN} />;
}

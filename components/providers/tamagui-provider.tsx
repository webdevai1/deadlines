import { ReactNode } from "react";
import { useSelector } from "@/store/hooks";
import tamaguiConfig from "@/tamagui.config";
import { TamaguiProvider as Tamagui } from "tamagui";

type TamaguiProviderProps = {
  children: ReactNode;
};
export default function TamaguiProvider({ children }: TamaguiProviderProps) {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <Tamagui config={tamaguiConfig} defaultTheme={theme}>
      {children}
    </Tamagui>
  );
}

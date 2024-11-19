import { ReactNode } from "react";
import { PortalProvider } from "tamagui";
import { StatusBar } from "expo-status-bar";
import { NotifierWrapper } from "react-native-notifier";

import RTKProvider from "./rtk-provider";
import TamaguiProvider from "./tamagui-provider";
import GestureHandlerProvider from "./gesture-handler-provider";

type CombipeProvidersProps = {
  children: ReactNode;
};
export default function CombipeProviders({ children }: CombipeProvidersProps) {
  return (
    <RTKProvider>
      <TamaguiProvider>
        <GestureHandlerProvider>
          <NotifierWrapper>
            <StatusBar backgroundColor="transparent" style="dark" translucent />
            <PortalProvider shouldAddRootHost>{children}</PortalProvider>
          </NotifierWrapper>
        </GestureHandlerProvider>
      </TamaguiProvider>
    </RTKProvider>
  );
}

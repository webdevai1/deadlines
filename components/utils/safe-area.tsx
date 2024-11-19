import { ReactNode } from "react";
import { View, ViewProps } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SafeAreaProps = {
  children: ReactNode;
  childrenWrapperProps?: ViewProps;
  paddings?: Partial<{
    bottom: number;
    left: number;
    right: number;
    top: number;
  }>;
  pure?: boolean;
  statusBarBg?: string;
  wrapperProps?: ViewProps;
};
export default function SafeArea({
  children,
  childrenWrapperProps,
  paddings,
  pure = false,
  statusBarBg,
  wrapperProps,
}: SafeAreaProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      bg={pure ? undefined : statusBarBg || "$bg"}
      f={1}
      pb={paddings?.bottom ?? insets.bottom}
      pl={paddings?.left ?? insets.left}
      pr={paddings?.right ?? insets.right}
      pt={paddings?.top ?? insets.top}
      {...wrapperProps}
    >
      <View bg={pure ? undefined : "$bg"} f={1} {...childrenWrapperProps}>
        {children}
      </View>
    </View>
  );
}

import { router } from "expo-router";
import { ArrowBack } from "@/components/data-display/icons";
import {
  Circle,
  H2,
  H3,
  HeadingProps,
  View,
  XStack,
  XStackProps,
} from "tamagui";

type ScreenHeaderProps = {
  leftAction?: () => void;
  leftActionChildren?: React.ReactNode;
  rightAction?: () => void;
  rightActionChildren?: React.ReactNode;
  showLeftAction?: boolean;
  showRightAction?: boolean;
  size?: "md" | "sm";
  title?: string;
  titleProps?: HeadingProps;
  wrapperProps?: XStackProps;
};
export default function ScreenHeader({
  leftAction = () => router.back(),
  leftActionChildren = <ArrowBack />,
  rightAction,
  rightActionChildren,
  showLeftAction,
  showRightAction,
  size = "md",
  title,
  titleProps,
  wrapperProps,
}: ScreenHeaderProps) {
  return (
    <XStack ai={"center"} jc="space-between" {...wrapperProps}>
      <XStack f={1} jc={"flex-start"}>
        {showLeftAction && (
          <Circle
            borderColor={"$border"}
            borderWidth={"$1"}
            onPress={leftAction}
            size={"$6"}
          >
            {leftActionChildren}
          </Circle>
        )}
      </XStack>
      <View f={2}>
        {size === "sm" && (
          <H3 color={"$primary"} ta={"center"} {...titleProps}>
            {title}
          </H3>
        )}
        {size === "md" && (
          <H2 color={"$primary"} ta={"center"} {...titleProps}>
            {title}
          </H2>
        )}
      </View>
      <XStack f={1} jc={"flex-end"}>
        {showRightAction && (
          <Circle
            borderColor={"$border"}
            borderWidth={"$1"}
            onPress={rightAction}
            size={"$6"}
          >
            {rightActionChildren}
          </Circle>
        )}
      </XStack>
    </XStack>
  );
}

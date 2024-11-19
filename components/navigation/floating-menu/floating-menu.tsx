import { useState } from "react";
import { YStack } from "tamagui";
import { BlurView } from "expo-blur";
import { Circle, View } from "tamagui";
import { ROUTES } from "@/constants/routes";
import { router, usePathname } from "expo-router";
import PlusRec from "@/components/data-display/icons/plus-rec";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import {
  GroupAdd,
  Groups,
  Home,
  Menu,
  Settings,
  X,
} from "@/components/data-display/icons";

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handlePress = (to: ROUTES) => {
    if (!to.endsWith(pathname)) router.push(to);
  };

  return (
    <YStack bottom={10} gap="$3" pos={"absolute"} right={5}>
      {isOpen && (
        <>
          <Animated.View
            entering={FadeInDown.delay(4 * 100).duration(200)}
            exiting={FadeOutDown.delay(0 * 100).duration(200)}
          >
            <Circle
              borderColor={"$black"}
              borderWidth={"$1"}
              onPress={() => handlePress(ROUTES.ADD_DEADLINE)}
              ov={"hidden"}
              size={"$6"}
            >
              <BlurView
                intensity={70}
                style={{ flex: 1, width: "100%" }}
                tint="systemUltraThinMaterialLight"
              >
                <View ai={"center"} f={1} jc={"center"}>
                  <PlusRec />
                </View>
              </BlurView>
            </Circle>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(3 * 100).duration(200)}
            exiting={FadeOutDown.delay(1 * 100).duration(200)}
          >
            <Circle
              borderColor={"$black"}
              borderWidth={"$1"}
              onPress={() => handlePress(ROUTES.GROUPS)}
              ov={"hidden"}
              size={"$6"}
            >
              <BlurView
                intensity={70}
                style={{ flex: 1, width: "100%" }}
                tint="systemUltraThinMaterialLight"
              >
                <View ai={"center"} f={1} jc={"center"}>
                  <Groups />
                </View>
              </BlurView>
            </Circle>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(2 * 100).duration(200)}
            exiting={FadeOutDown.delay(2 * 100).duration(200)}
          >
            <Circle
              borderColor={"$black"}
              borderWidth={"$1"}
              onPress={() => handlePress(ROUTES.ADD_GROUP)}
              ov={"hidden"}
              size={"$6"}
            >
              <BlurView
                intensity={70}
                style={{ flex: 1, width: "100%" }}
                tint="systemUltraThinMaterialLight"
              >
                <View ai={"center"} f={1} jc={"center"}>
                  <GroupAdd />
                </View>
              </BlurView>
            </Circle>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(1 * 100).duration(200)}
            exiting={FadeOutDown.delay(3 * 100).duration(200)}
          >
            <Circle
              borderColor={"$black"}
              borderWidth={"$1"}
              onPress={() => handlePress(ROUTES.SETTINGS)}
              ov={"hidden"}
              size={"$6"}
            >
              <BlurView
                intensity={70}
                style={{ flex: 1, width: "100%" }}
                tint="systemUltraThinMaterialLight"
              >
                <View ai={"center"} f={1} jc={"center"}>
                  <Settings />
                </View>
              </BlurView>
            </Circle>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(0 * 100).duration(200)}
            exiting={FadeOutDown.delay(4 * 100).duration(200)}
          >
            <Circle
              borderColor={"$black"}
              borderWidth={"$1"}
              onPress={() => handlePress(ROUTES.HOME)}
              ov={"hidden"}
              size={"$6"}
            >
              <BlurView
                intensity={70}
                style={{ flex: 1, width: "100%" }}
                tint="systemUltraThinMaterialLight"
              >
                <View ai={"center"} f={1} jc={"center"}>
                  <Home />
                </View>
              </BlurView>
            </Circle>
          </Animated.View>
        </>
      )}
      <Circle
        borderWidth={"$1"}
        onPress={toggleMenu}
        overflow="hidden"
        size={"$6"}
      >
        <BlurView
          intensity={70}
          style={{ flex: 1, width: "100%" }}
          tint="systemUltraThinMaterialLight"
        >
          <View ai={"center"} f={1} jc={"center"}>
            <View animation={"quick"} opacity={isOpen ? 1 : 0} pos={"absolute"}>
              <X />
            </View>

            <View animation={"quick"} opacity={isOpen ? 0 : 1} pos={"absolute"}>
              <Menu />
            </View>
          </View>
        </BlurView>
      </Circle>
    </YStack>
  );
}

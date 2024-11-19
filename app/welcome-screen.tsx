import { router } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { useDispatch } from "@/store/hooks";
import { ImageBackground } from "react-native";
import { useTranslation } from "react-i18next";
import SafeArea from "@/components/utils/safe-area";
import { ArrowRight } from "@/components/data-display/icons";
import { setIsShown } from "@/store/slices/welcome-screen-slice";
import { Button, H1, SizableText, XStack, YStack } from "tamagui";

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleGetStarted = () => {
    dispatch(setIsShown(true));
    router.push(ROUTES.HOME);
  };
  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/images/gradients/1.png")}
      style={{ flex: 1, height: "100%", width: "100%" }}
    >
      <SafeArea pure>
        <YStack ai={"center"} gap="$4" h={"90%"} jc={"center"} px="$4" py="$4">
          <YStack>
            <H1 color={"$textPrimary"}>{t("deadlines.deadlines")}</H1>
            <SizableText
              color={"$textPrimary"}
              fontStyle="italic"
              size="$6"
              ta={"center"}
            >
              {t("welcomeScreen.title")}
            </SizableText>
          </YStack>
          <Button
            bg={"$white-15"}
            borderColor={"$gray-7"}
            borderWidth={"$0.5"}
            color={"$textPrimary"}
            onPress={handleGetStarted}
            size={"$6"}
          >
            <XStack ai={"center"} gap="$3">
              <SizableText>{t("welcomeScreen.getStarted")}</SizableText>
              <ArrowRight />
            </XStack>
          </Button>
        </YStack>
      </SafeArea>
    </ImageBackground>
  );
}

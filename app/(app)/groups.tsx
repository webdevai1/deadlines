import { useSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { GroupsList } from "@/components/groups";
import SafeArea from "@/components/utils/safe-area";
import { H3, ScrollView, View, YStack } from "tamagui";

export default function GroupsScreen() {
  const { t } = useTranslation(undefined, { keyPrefix: "groups" });
  const { favoriteGroups, groups } = useSelector((state) => state.groups);
  return (
    <>
      <SafeArea>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View h={"$8"} jc={"center"} pos={"relative"} px="$4">
            <H3>{t("title")}</H3>
          </View>
          <YStack gap="$2" px="$4">
            <GroupsList favoriteGroups={favoriteGroups} groups={groups} />
          </YStack>
        </ScrollView>
      </SafeArea>
    </>
  );
}

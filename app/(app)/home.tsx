import { useState } from "react";
import Constants from "expo-constants";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";
import { GroupItem } from "@/components/groups";
import SafeArea from "@/components/utils/safe-area";
import { DeadlinesList } from "@/components/deadlines";
import { useDispatch, useSelector } from "@/store/hooks";
import { H3, Image, ScrollView, XStack, YStack } from "tamagui";
import { setIsShown } from "@/store/slices/welcome-screen-slice";

export default function Index() {
  const { t } = useTranslation(undefined, { keyPrefix: "deadlines" });
  const dispatch = useDispatch();
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const groups = useSelector((state) => state.groups.groups);
  const deadlines = useSelector((state) => state.deadlines.deadlines);
  const selectedDeadlines =
    selectedGroups.length === 0
      ? deadlines
      : deadlines.filter((deadline) =>
          deadline.groupIds.some((id) => selectedGroups.includes(id)),
        );
  const handleAddGroupFilter = (groupId: string) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter((id) => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };
  return (
    <>
      <SafeArea>
        <LottieView
          autoPlay
          loop
          source={require("../../assets/lotties/leaves.json")}
          style={{
            height: 170,
            position: "absolute",
            right: -25,
            top: -Constants.statusBarHeight - 5,
            transform: [{ rotate: "20deg" }],
            width: 170,
            zIndex: 0,
          }}
        />
        <Image
          left={0}
          pos={"absolute"}
          source={require("../../assets/images/shapes/1.png")}
          top={-Constants.statusBarHeight}
        />
        <ScrollView pt="$4" showsVerticalScrollIndicator={false}>
          <YStack gap="$2" pos={"relative"} px="$4" zIndex={10}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <XStack gap="$3">
                {groups.map((group) => (
                  <GroupItem
                    group={group}
                    isSelected={selectedGroups.includes(group.id)}
                    key={group.id}
                    onPress={() => handleAddGroupFilter(group.id)}
                  />
                ))}
              </XStack>
            </ScrollView>
            <XStack jc="space-between">
              <H3 onPress={() => dispatch(setIsShown(true))}>
                {t("deadlines")}
              </H3>
              <H3>{selectedDeadlines.length}</H3>
            </XStack>
            <DeadlinesList deadlines={selectedDeadlines} />
          </YStack>
        </ScrollView>
      </SafeArea>
    </>
  );
}

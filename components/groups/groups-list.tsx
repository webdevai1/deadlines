import { useDispatch } from "@/store/hooks";
import { View, XStack, YStack } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { DIALOGS } from "@/types/enums/dialogs";
import { Group } from "@/types/store/slices/groups";
import { openDialog } from "@/store/slices/dialogs-slice";

import GroupItem from "./group-item";

type GroupItemProps = {
  favoriteGroups: string[];
  groups: Group[];
};
export default function GroupsList({ favoriteGroups, groups }: GroupItemProps) {
  const dispatch = useDispatch();
  return (
    <YStack gap="$3">
      <XStack gap="$5">
        <FlashList
          data={groups}
          estimatedItemSize={106}
          extraData={favoriteGroups}
          ItemSeparatorComponent={() => <View h="$1" />}
          numColumns={2}
          renderItem={({ index, item }) => (
            <View
              f={1}
              onPress={() =>
                dispatch(
                  openDialog({ data: item, dialogName: DIALOGS.GROUP_DETAILS }),
                )
              }
              pl={index % 2 === 0 ? 0 : "$2"}
              pr={index % 1 === 0 ? "$2" : 0}
            >
              <GroupItem group={item} />
            </View>
          )}
        />
      </XStack>
    </YStack>
  );
}

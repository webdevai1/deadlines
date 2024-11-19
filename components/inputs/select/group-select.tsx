import { Sheet, View } from "tamagui";
import { useSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { Group } from "@/types/store/slices/groups";
import { useCallback, useMemo, useState } from "react";
import { Check, ChevronUp } from "@/components/data-display/icons";
import { Input, ScrollView, SizableText, Square, XStack } from "tamagui";

type SelectProps = {
  selectedGroups: string[];
  setSelectedGroups: (groups: string[]) => void;
};

export default function GroupSelect({
  selectedGroups,
  setSelectedGroups,
}: SelectProps) {
  const { t } = useTranslation();
  const groups = useSelector((state) => state.groups.groups);
  const [search, setSearch] = useState<string>("");
  const [sheetState, setSheetState] = useState({ open: false, position: 0 });

  const filteredItems = useMemo(
    () =>
      groups.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [groups, search],
  );

  const toggleSheet = useCallback(
    () => setSheetState((prev) => ({ ...prev, open: !prev.open })),
    [],
  );

  const handlePositionChange = useCallback(
    (pos: number) => setSheetState((prev) => ({ ...prev, position: pos })),
    [],
  );

  const handleSelect = (item: Group) => {
    setSelectedGroups([...selectedGroups, item.id]);
  };
  const handleDeselect = (item: Group) => {
    setSelectedGroups(selectedGroups.filter((i) => i !== item.id));
  };

  return (
    <>
      <XStack
        ai="center"
        borderColor="$border"
        borderWidth="$1"
        br="$6"
        jc="space-between"
        onPress={toggleSheet}
        p="$3.5"
      >
        <SizableText>
          {groups
            .filter((group) => selectedGroups.includes(group.id))
            .map((group) => group.name)
            .join(", ") || t("forms.labels.selectValue")}
        </SizableText>
        <Square animation="quick" rotate={sheetState.open ? "180deg" : "0deg"}>
          <ChevronUp />
        </Square>
      </XStack>

      <Sheet
        animation="medium"
        dismissOnSnapToBottom
        forceRemoveScrollEnabled={sheetState.open}
        modal={true}
        onOpenChange={toggleSheet}
        onPositionChange={handlePositionChange}
        open={sheetState.open}
        position={sheetState.position}
        snapPoints={[50, 30]}
        snapPointsMode={"percent"}
        zIndex={100_000}
      >
        <Sheet.Overlay
          animation="lazy"
          bg="$white-50"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle bg="$primary" opacity={1} />
        <Sheet.Frame
          alignItems="center"
          bg="$white"
          br="$7"
          gap="$3"
          justifyContent="center"
          p="$3"
        >
          <Input
            onChangeText={setSearch}
            placeholder="Search"
            value={search}
            w="100%"
          />

          <ScrollView showsVerticalScrollIndicator={false} w="100%">
            {filteredItems.map((group) => {
              const selected = selectedGroups.includes(group.id);
              return (
                <XStack
                  gap="$3"
                  jc="center"
                  key={group.id}
                  onPress={() =>
                    selected ? handleDeselect(group) : handleSelect(group)
                  }
                  p="$3"
                  pos="relative"
                  w="100%"
                >
                  {selected && (
                    <View pos="absolute" right="$0" top="$3">
                      <Check />
                    </View>
                  )}
                  <SizableText>{group.name}</SizableText>
                </XStack>
              );
            })}
          </ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}

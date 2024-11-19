import { Sheet, View } from "tamagui";
import { useCallback, useMemo, useState } from "react";
import { Check, ChevronUp } from "@/components/data-display/icons";
import { Input, ScrollView, SizableText, Square, XStack } from "tamagui";

const spModes = ["percent", "constant", "fit", "mixed"] as const;

type SelectProps<T> = {
  extractItemKey: (value: T) => string;
  items: T[];
  onChange: (value: T) => void;
  renderLabel: (value: T) => string;
  showSearch?: boolean;
  snapPoints?: number[];
  snapPointsMode?: (typeof spModes)[number];
  value: T;
};

export default function Select<T>({
  extractItemKey,
  items,
  onChange,
  renderLabel,
  showSearch = true,
  snapPoints,
  snapPointsMode = "percent",
  value,
}: SelectProps<T>) {
  const [search, setSearch] = useState<string>("");
  const [sheetState, setSheetState] = useState({ open: false, position: 0 });

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          !showSearch ||
          renderLabel(item).toLowerCase().includes(search.toLowerCase()),
      ),
    [items, renderLabel, search, showSearch],
  );

  const toggleSheet = useCallback(
    () => setSheetState((prev) => ({ ...prev, open: !prev.open })),
    [],
  );

  const handlePositionChange = useCallback(
    (pos: number) => setSheetState((prev) => ({ ...prev, position: pos })),
    [],
  );

  const handleSelect = useCallback(
    (item: T) => {
      onChange(item);
      setSheetState({ open: false, position: 0 });
    },
    [onChange],
  );

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
        <SizableText>{renderLabel(value) || "Select value"}</SizableText>
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
        snapPoints={snapPoints || [50, 30]}
        snapPointsMode={snapPointsMode}
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
          {showSearch && (
            <Input
              onChangeText={setSearch}
              placeholder="Search"
              value={search}
              w="100%"
            />
          )}

          <ScrollView showsVerticalScrollIndicator={false} w="100%">
            {filteredItems.map((item) => {
              const key = extractItemKey(item);
              return (
                <XStack
                  gap="$3"
                  jc="center"
                  key={key}
                  onPress={() => handleSelect(item)}
                  p="$3"
                  pos="relative"
                  w="100%"
                >
                  {extractItemKey(value) === key && (
                    <View pos="absolute" right="$0" top="$3">
                      <Check />
                    </View>
                  )}
                  <SizableText>{renderLabel(item)}</SizableText>
                </XStack>
              );
            })}
          </ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}

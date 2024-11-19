import { H4, XStack } from "tamagui";
import { Group } from "@/types/store/slices/groups";

type GroupItemProps = {
  group: Group;
  isSelected?: boolean;
  onPress?: () => void;
};

export default function GroupItem({
  group,
  isSelected = false,
  ...props
}: GroupItemProps) {
  return (
    <XStack
      bg={group.color}
      borderColor={isSelected ? "$gray-9" : "transparent"}
      borderWidth={"$1"}
      br="$6"
      f={1}
      gap="$3"
      px="$3"
      py="$1"
      {...props}
    >
      <H4 userSelect="none">{group.name}</H4>
    </XStack>
  );
}

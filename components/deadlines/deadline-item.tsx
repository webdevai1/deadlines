import { format } from "date-fns";
import { router } from "expo-router";
import useToast from "@/hooks/use-toast";
import { cutText } from "@/utils/helpers";
import { ROUTES } from "@/constants/routes";
import { useDispatch } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { DIALOGS } from "@/types/enums/dialogs";
import { Deadline } from "@/types/store/slices/deadlines";
import { Edit, Trash } from "@/components/data-display/icons";
import { useCountProgress } from "@/hooks/use-count-progress";
import { ProgressBar2 } from "@/components/data-display/charts";
import { deleteDeadline } from "@/store/slices/deadlines-slice";
import { closeAllDialogs, openDialog } from "@/store/slices/dialogs-slice";
import { Circle, H4, SizableText, useTheme, XStack, YStack } from "tamagui";

type DeadlineItemProps = {
  deadline: Deadline;
  onPress?: () => void;
};
export default function DeadlineItem({ deadline, onPress }: DeadlineItemProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const progress = useCountProgress(deadline.createdAt, deadline.due);
  const { success } = useToast();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      openDialog({
        data: {
          onCancel: () => {},
          onConfirm: () => {
            dispatch(deleteDeadline(deadline.id));
            success(t("deadlines.messages.deleted"));
          },
        },
        dialogName: DIALOGS.CONFIRM_ACTION,
      }),
    );
  };
  const handleEditPress = () => {
    dispatch(closeAllDialogs());
    router.push({
      params: { id: deadline.id },
      pathname: ROUTES.EDIT_DEADLINE,
    });
  };
  return (
    <YStack pb="$3" pos={"relative"}>
      <YStack
        borderColor={"$border"}
        borderWidth={"$1"}
        br={"$7"}
        h="$7"
        jc="flex-end"
        ov={"hidden"}
        pos={"absolute"}
        top={"$5"}
        w={"100%"}
      >
        <ProgressBar2 br={"$6"} progress={progress} />
      </YStack>
      <XStack
        ai="center"
        bg={"$bg"}
        borderColor={"$border"}
        borderWidth={"$1"}
        br={"$7"}
        jc={"space-between"}
        onPress={onPress}
        px={"$4"}
        py={"$3"}
        w="100%"
      >
        <Circle borderColor={"$border"} borderWidth="$1" size="$2" />
        <YStack>
          <H4>{cutText(deadline.title, 20)}</H4>
          <SizableText>
            {t("forms.labels.due")}:{" "}
            {format(deadline.due, "MMMM dd, yyyy HH:mm")}
          </SizableText>
        </YStack>
        <XStack gap="$2">
          <Edit onPress={handleEditPress} stroke={theme["gray-7"].val} />
          <Trash fill={theme["red-6"].val} onPress={handleDelete} />
        </XStack>
      </XStack>
    </YStack>
  );
}

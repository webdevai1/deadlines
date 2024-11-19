import { format } from "date-fns";
import { router } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "react-i18next";
import { DIALOGS } from "@/types/enums/dialogs";
import { X } from "@/components/data-display/icons";
import { useTimeLeft } from "@/hooks/use-time-left";
import { useDispatch, useSelector } from "@/store/hooks";
import { Deadline } from "@/types/store/slices/deadlines";
import { DonutChart } from "@/components/data-display/charts";
import { useCountProgress } from "@/hooks/use-count-progress";
import {
  PrimaryButton,
  PrimaryOutlinedButton,
} from "@/components/inputs/buttons/primary";
import {
  Button,
  Dialog,
  H4,
  H5,
  ScrollView,
  Unspaced,
  XStack,
  YStack,
} from "tamagui";
import {
  closeAllDialogs,
  closeDialog,
  DialogState,
  setDialogOpen,
} from "@/store/slices/dialogs-slice";

const mockDeadline: Deadline = {
  color: "#FFAACC",
  createdAt: "2022-09-01T00:00:00.000Z",
  description: "",
  due: "2022-09-01T00:00:00.000Z",
  groupIds: [],
  id: "1",
  title: "",
};
export default function DeadlinesDetails() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data, open }: DialogState<Deadline> = useSelector(
    (state) => state.dialogs.deadlineDetails,
  );
  const deadline = data || mockDeadline;
  const progress = useCountProgress(
    deadline?.createdAt as string,
    deadline?.due as string,
  );
  const timeLeft = useTimeLeft(deadline?.due as string);

  const handleClose = () => dispatch(closeDialog(DIALOGS.DEADLINE_DETAILS));
  const handleOpenChange = (open: boolean) => {
    dispatch(setDialogOpen({ dialogName: DIALOGS.DEADLINE_DETAILS, open }));
  };

  const handleEditPress = () => {
    dispatch(closeAllDialogs());
    router.push({
      params: { id: deadline.id },
      pathname: ROUTES.EDIT_DEADLINE,
    });
  };
  return (
    <Dialog modal onOpenChange={handleOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay
          animation="slow"
          aria-label="Close"
          bg="$bg"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          key="overlay"
          onPress={handleClose}
          opacity={0.5}
        />

        <Dialog.Content
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          bg="$bg"
          bordered
          elevate
          enterStyle={{ opacity: 0, scale: 0.9, x: 0, y: -20 }}
          exitStyle={{ opacity: 0, scale: 0.95, x: 0, y: 10 }}
          gap="$4"
          key="content"
          maxHeight={"90%"}
          w={"95%"}
        >
          <Dialog.Title>{t("deadlines.details.title")}</Dialog.Title>
          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack gap="$5">
              <YStack gap="$3">
                <XStack gap="$3" jc="space-between">
                  <H5>{t("forms.labels.title")}:</H5>
                  <H5 maxWidth={"80%"}>{deadline.title}</H5>
                </XStack>
                <XStack gap="$3" jc="space-between">
                  <H5>{t("forms.labels.desc")}:</H5>
                  <H5 maxWidth={"80%"}>
                    {deadline?.description || "No description"}
                  </H5>
                </XStack>
                <XStack gap="$3" jc="space-between">
                  <H5>{t("forms.labels.due")}:</H5>
                  <H5 maxWidth={"80%"}>{format(deadline.due, "PPpp")}</H5>
                </XStack>
                <XStack gap="$3" jc="space-between">
                  <H5>{t("forms.labels.created")}:</H5>
                  <H5 maxWidth={"80%"}>{format(deadline.createdAt, "PPpp")}</H5>
                </XStack>
                <Dialog.Close asChild>
                  <PrimaryButton
                    alignSelf="flex-start"
                    aria-label={t("deadlines.details.edit")}
                    onPress={handleEditPress}
                  >
                    {t("forms.buttons.edit")}
                  </PrimaryButton>
                </Dialog.Close>
              </YStack>
              <XStack jc="center">
                <DonutChart
                  completePercentage={progress}
                  radius={140}
                  strokeWidth={25}
                >
                  <H4>{`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</H4>
                </DonutChart>
              </XStack>
            </YStack>
          </ScrollView>
          <Dialog.Close asChild>
            <PrimaryOutlinedButton aria-label="Close">
              {t("forms.buttons.close")}
            </PrimaryOutlinedButton>
          </Dialog.Close>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                circular
                icon={X}
                position="absolute"
                right="$3"
                size="$2"
                top="$3"
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

import { router } from "expo-router";
import useToast from "@/hooks/use-toast";
import { ROUTES } from "@/constants/routes";
import { useTranslation } from "react-i18next";
import { DIALOGS } from "@/types/enums/dialogs";
import { X } from "@/components/data-display/icons";
import { Group } from "@/types/store/slices/groups";
import { DeadlinesList } from "@/components/deadlines";
import { useDispatch, useSelector } from "@/store/hooks";
import { deleteGroup } from "@/store/slices/groups-slice";
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
  openDialog,
  setDialogOpen,
} from "@/store/slices/dialogs-slice";

const mockGroup: Group = {
  color: "#FFAACC",
  id: "1",
  name: "",
};
export default function GroupDetails() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data, open }: DialogState<Group> = useSelector(
    (state) => state.dialogs.groupDetails,
  );
  const deadlines = useSelector((state) => state.deadlines.deadlines).filter(
    (deadline) => deadline.groupIds.includes(data?.id || ""),
  );
  const group = data || mockGroup;

  const handleClose = () => dispatch(closeDialog(DIALOGS.GROUP_DETAILS));
  const handleOpenChange = (open: boolean) => {
    dispatch(setDialogOpen({ dialogName: DIALOGS.GROUP_DETAILS, open }));
  };

  const { success } = useToast();
  const handleDelete = () => {
    dispatch(
      openDialog({
        data: {
          onCancel: () => {},
          onConfirm: () => {
            dispatch(closeAllDialogs());
            dispatch(deleteGroup(group.id));
            success(t("groups.messages.deleted"));
          },
        },
        dialogName: DIALOGS.CONFIRM_ACTION,
      }),
    );
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
          <Dialog.Title>{t("groups.details.title")}</Dialog.Title>
          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack gap="$5">
              <YStack gap="$3">
                <XStack gap="$3" jc="space-between">
                  <H5>{t("forms.labels.name")}:</H5>
                  <H5 maxWidth={"80%"}>{group.name}</H5>
                </XStack>
                <XStack gap="$3" jc="space-between">
                  <H5>{t("forms.labels.color")}:</H5>
                  <H5 bg={group.color} br="$2" maxWidth={"80%"} px="$2">
                    {group?.color || "No description"}
                  </H5>
                </XStack>
                <XStack gap="$3">
                  <Dialog.Close asChild>
                    <PrimaryButton
                      alignSelf="flex-start"
                      aria-label="Edit group"
                      onPress={() =>
                        router.push({
                          params: { id: group.id },
                          pathname: ROUTES.EDIT_GROUP,
                        })
                      }
                    >
                      {t("forms.buttons.edit")}
                    </PrimaryButton>
                  </Dialog.Close>
                  <PrimaryButton
                    alignSelf="flex-start"
                    aria-label="Delete group"
                    onPress={handleDelete}
                  >
                    {t("forms.buttons.delete")}
                  </PrimaryButton>
                </XStack>
              </YStack>
              <H4>{t("deadlines.deadlines")}</H4>
              <DeadlinesList deadlines={deadlines} />
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

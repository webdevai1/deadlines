import { useState } from "react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import DateTimePicker from "react-native-ui-datepicker";
import { CalendarDates, X } from "@/components/data-display/icons";
import {
  PrimaryButton,
  PrimaryOutlinedButton,
} from "@/components/inputs/buttons/primary";
import {
  Button,
  Dialog,
  SizableText,
  Unspaced,
  useTheme,
  XStack,
} from "tamagui";

type DatePickerProps = {
  date: Date;
  setDate: (date: Date) => void;
  withTime?: boolean;
};

export default function DatePicker({
  date,
  setDate,
  withTime = false,
}: DatePickerProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [localDate, setLocalDate] = useState<Date>(date);

  const theme = useTheme();

  const handleClose = () => setOpen(false);
  const handleSave = () => {
    setDate(localDate);
  };
  return (
    <Dialog modal onOpenChange={setOpen} open={open}>
      <Dialog.Trigger asChild>
        <XStack
          ai={"center"}
          borderColor={"$border"}
          borderWidth="$1"
          br={"$6"}
          jc={"space-between"}
          p="$3.5"
        >
          <SizableText>{format(date, "MMMM dd , yyyy")}</SizableText>
          <CalendarDates />
        </XStack>
      </Dialog.Trigger>

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
          w={"95%"}
        >
          <Dialog.Title>{format(date, "MMMM dd , yyyy")}</Dialog.Title>
          <Dialog.Description>{t("dialogs.pickers.date")}</Dialog.Description>
          <DateTimePicker
            date={localDate}
            firstDayOfWeek={1}
            mode="single"
            onChange={(params) =>
              params.date && setLocalDate(new Date(params.date.toString()))
            }
            selectedItemColor={theme.primary.val}
            timePicker={withTime}
            todayTextStyle={{ color: theme.textPrimary.val }}
          />

          <XStack gap="$3">
            <Dialog.Close asChild>
              <PrimaryOutlinedButton aria-label="Close" f={1}>
                {t("forms.buttons.close")}
              </PrimaryOutlinedButton>
            </Dialog.Close>
            <Dialog.Close asChild>
              <PrimaryButton aria-label="Save" f={1} onPress={handleSave}>
                {t("forms.buttons.save")}
              </PrimaryButton>
            </Dialog.Close>
          </XStack>

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

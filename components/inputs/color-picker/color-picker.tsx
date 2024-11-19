import { useState } from "react";
import { colors } from "@/constants/colors";
import { useTranslation } from "react-i18next";
import { X } from "@/components/data-display/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReanimatedColorPicker, {
  Panel3,
  Swatches,
} from "reanimated-color-picker";
import {
  ColorPickerSchema,
  ColorPickerSchemaType,
} from "@/types/validation/simple";
import {
  PrimaryButton,
  PrimaryOutlinedButton,
} from "@/components/inputs/buttons/primary";
import {
  Button,
  Circle,
  Dialog,
  Input,
  SizableText,
  Unspaced,
  XStack,
  YStack,
} from "tamagui";

type DatePickerProps = {
  color: string;
  setColor: (color: string) => void;
};

export default function ColorPicker({ color, setColor }: DatePickerProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);

  const { control, handleSubmit, setValue, watch } =
    useForm<ColorPickerSchemaType>({
      defaultValues: {
        color,
      },
      mode: "all",
      resolver: zodResolver(ColorPickerSchema),
    });

  const localColor = watch("color");

  const onSubmit: SubmitHandler<ColorPickerSchemaType> = ({ color }) => {
    setColor(color);
    setOpen(false);
  };

  return (
    <Dialog modal onOpenChange={setOpen} open={open}>
      <Dialog.Trigger asChild>
        <XStack
          ai={"center"}
          borderColor={"$border"}
          borderWidth="$1"
          br={"$6"}
          gap="$3"
          p="$3"
        >
          <Circle borderColor={"$border"} borderWidth="$0.5" p={"$0.5"}>
            <Circle bg={color} size={"$2"} />
          </Circle>
          <SizableText>{color}</SizableText>
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
          <Dialog.Title
            alignSelf="flex-start"
            bg={localColor}
            br={"$5"}
            px="$2"
          >
            {localColor}
          </Dialog.Title>
          <Dialog.Description>{t("dialogs.pickers.color")}</Dialog.Description>
          <ReanimatedColorPicker
            onComplete={(colors) =>
              setValue("color", colors.hex, { shouldValidate: true })
            }
          >
            <YStack ai={"center"} gap="$3">
              <Panel3 style={{ borderRadius: 10, width: 300 }} />
              <YStack w="100%">
                <Controller
                  control={control}
                  name="color"
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Input
                        borderColor={error ? "$red-5" : "$border"}
                        onChangeText={(color) => onChange(color)}
                        value={value}
                        w={"100%"}
                      />
                      <SizableText color="$red-5" size={"$1"}>
                        {error?.message || " "}
                      </SizableText>
                    </>
                  )}
                />
              </YStack>
              <Swatches
                colors={[
                  colors.white,
                  colors["blue-3"],
                  colors["blue-5"],
                  colors["blue-7"],
                  colors["orange-3"],
                  colors["orange-5"],
                  colors["orange-7"],
                  colors["teal-3"],
                  colors["teal-5"],
                  colors["teal-7"],
                ]}
                style={{ justifyContent: "center" }}
              />
            </YStack>
          </ReanimatedColorPicker>

          <XStack gap="$3">
            <Dialog.Close asChild>
              <PrimaryOutlinedButton aria-label="Close" f={1}>
                {t("forms.buttons.cancel")}
              </PrimaryOutlinedButton>
            </Dialog.Close>
            <PrimaryButton
              aria-label="Save"
              f={1}
              onPress={handleSubmit(onSubmit)}
            >
              {t("forms.buttons.save")}
            </PrimaryButton>
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

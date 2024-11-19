import * as Crypto from "expo-crypto";
import useToast from "@/hooks/use-toast";
import { useDispatch } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import SafeArea from "@/components/utils/safe-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/inputs/date-picker";
import { ColorPicker } from "@/components/inputs/color-picker";
import { createDeadline } from "@/store/slices/deadlines-slice";
import GroupSelect from "@/components/inputs/select/group-select";
import { ScreenHeader } from "@/components/surfaces/screen-header";
import { PrimaryButton } from "@/components/inputs/buttons/primary";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Fieldset, H4, Input, ScrollView, TextArea, YStack } from "tamagui";
import {
  AddDeadlineSchema,
  AddDeadlineSchemaType,
} from "@/types/validation/add-deadline";

export default function AddDeadline() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm<AddDeadlineSchemaType>({
    defaultValues: {
      color: "#8b99ff",
      description: "",
      due: new Date(),
      groupIds: [],
      title: "",
    },
    resolver: zodResolver(AddDeadlineSchema),
  });
  const { success } = useToast();
  const onSubmit: SubmitHandler<AddDeadlineSchemaType> = (data) => {
    dispatch(
      createDeadline({
        ...data,
        createdAt: new Date().toISOString(),
        due: data.due.toISOString(),
        id: Crypto.randomUUID(),
      }),
    );
    success(t("deadlines.messages.createdSuccessfully"));
    reset();
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeArea childrenWrapperProps={{ gap: "$6", px: "$3" }}>
        <ScreenHeader
          showLeftAction
          size="sm"
          title={t("deadlines.add.title")}
        />
        <YStack gap="$5">
          <Fieldset gap="$3">
            <H4>{t("forms.labels.title")}</H4>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <Input
                  borderColor={"$border"}
                  borderWidth={"$1"}
                  br={"$6"}
                  onChangeText={onChange}
                  placeholder={t("forms.labels.title")}
                  value={value}
                />
              )}
            />

            <H4>{t("forms.labels.due")}</H4>
            <Controller
              control={control}
              name="due"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  date={value}
                  setDate={(date) => onChange(date)}
                  withTime
                />
              )}
            />
            <H4>{t("forms.labels.groups")}</H4>
            <Controller
              control={control}
              name="groupIds"
              render={({ field: { onChange, value } }) => (
                <GroupSelect
                  selectedGroups={value}
                  setSelectedGroups={onChange}
                />
              )}
            />
            <H4>{t("forms.labels.color")}</H4>
            <Controller
              control={control}
              name="color"
              render={({ field: { onChange, value } }) => (
                <ColorPicker
                  color={value}
                  setColor={(color) => onChange(color)}
                />
              )}
            />
            <H4>{t("forms.labels.description")}</H4>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <TextArea
                  borderColor={"$border"}
                  borderWidth={"$1"}
                  br={"$6"}
                  onChangeText={onChange}
                  placeholder={t("forms.labels.description")}
                  value={value}
                />
              )}
            />
          </Fieldset>
          <PrimaryButton onPress={handleSubmit(onSubmit)} size={"$5"}>
            {t("forms.buttons.add")}
          </PrimaryButton>
        </YStack>
      </SafeArea>
    </ScrollView>
  );
}

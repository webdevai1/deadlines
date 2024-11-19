import useToast from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams } from "expo-router";
import SafeArea from "@/components/utils/safe-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fieldset, Input, ScrollView } from "tamagui";
import { useDispatch, useSelector } from "@/store/hooks";
import { updateGroup } from "@/store/slices/groups-slice";
import { ColorPicker } from "@/components/inputs/color-picker";
import { ScreenHeader } from "@/components/surfaces/screen-header";
import { PrimaryButton } from "@/components/inputs/buttons/primary";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  AddGroupSchema,
  AddGroupSchemaType,
} from "@/types/validation/add-group";

export default function EditGroup() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const group = useSelector((state) =>
    state.groups.groups.find((group) => group.id === id),
  );
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm<AddGroupSchemaType>({
    defaultValues: {
      color: group?.color,
      name: group?.name,
    },
    resolver: zodResolver(AddGroupSchema),
  });
  const { success } = useToast();
  const onSubmit: SubmitHandler<AddGroupSchemaType> = (updatedData) => {
    dispatch(
      updateGroup({
        data: updatedData,
        id: group?.id as string,
      }),
    );
    success(t("groups.messages.updatedSuccessfully"));
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeArea childrenWrapperProps={{ gap: "$6", px: "$3" }}>
        <ScreenHeader
          showLeftAction
          size="sm"
          title={t("groups.update.title")}
        />
        <Fieldset gap="$3">
          <Controller
            control={control}
            name="name"
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
        </Fieldset>
        <PrimaryButton onPress={handleSubmit(onSubmit)} size={"$5"}>
          {t("forms.buttons.save")}
        </PrimaryButton>
      </SafeArea>
    </ScrollView>
  );
}

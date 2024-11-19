import { H4, YStack } from "tamagui";
import { Languages } from "@/assets/locales";
import MMKVStorage from "@/libs/mmkv-storage";
import { useTranslation } from "react-i18next";
import SafeArea from "@/components/utils/safe-area";
import { Select } from "@/components/inputs/select";
import { ScreenHeader } from "@/components/surfaces/screen-header";

type LanguageKeys = keyof typeof Languages;
export default function Settings() {
  const { i18n, t } = useTranslation(undefined, { keyPrefix: "settings" });
  const setLanguage = (lang: any) => {
    MMKVStorage.setItem("language", lang.locale);
    i18n.changeLanguage(lang.locale);
  };
  return (
    <SafeArea childrenWrapperProps={{ px: "$3" }}>
      <ScreenHeader showLeftAction size="sm" title={t("title")} />
      <YStack mt="$4">
        <H4>{t("language")}</H4>
        <Select
          extractItemKey={(language) => language.locale}
          items={Object.values(Languages)}
          onChange={setLanguage}
          renderLabel={(language) => language.label}
          snapPoints={[70, 50]}
          value={Languages[i18n.language as LanguageKeys]}
        />
      </YStack>
    </SafeArea>
  );
}

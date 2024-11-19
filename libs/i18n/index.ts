import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "@/assets/locales/en_US/translation.json";
import translationUa from "@/assets/locales/uk_UA/translation.json";
import translationFr from "@/assets/locales/fr_FR/translation.json";
import translationDe from "@/assets/locales/de_DE/translation.json";
import translationPl from "@/assets/locales/pl_PL/translation.json";
import translationJp from "@/assets/locales/ja_JP/translation.json";
import translationCn from "@/assets/locales/zh_CN/translation.json";
import translationCz from "@/assets/locales/cs_CZ/translation.json";
import translationSk from "@/assets/locales/sk_SK/translation.json";
import translationIt from "@/assets/locales/it_IT/translation.json";
import translationEs from "@/assets/locales/es_ES/translation.json";

import MMKVStorage from "../mmkv-storage";

const resources = {
  "cs-CZ": { translation: translationCz },
  "de-DE": { translation: translationDe },
  "en-US": { translation: translationEn },
  "es-ES": { translation: translationEs },
  "fr-FR": { translation: translationFr },
  "it-IT": { translation: translationIt },
  "ja-JP": { translation: translationJp },
  "pl-PL": { translation: translationPl },
  "sk-SK": { translation: translationSk },
  "uk-UA": { translation: translationUa },
  "zh-CN": { translation: translationCn },
};

const initI18n = async () => {
  let savedLanguage = await MMKVStorage.getItem("language");

  if (!savedLanguage) {
    const locales = Localization.getLocales();
    savedLanguage = locales.length > 0 ? locales[0].languageTag : "en-US";

    await MMKVStorage.setItem("language", savedLanguage);
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
    lng: savedLanguage,
    resources,
  });
};

initI18n();

export default i18n;

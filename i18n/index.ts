import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "./locales/en-US/translation.json";
import translationEs from "./locales/es-ES/translation.json";

const resources = {
  "es-ES": { translation: translationEs },
  "en-US": { translation: translationEn },
};

const initI18n = async () => {
  let savedLanguage =  Localization.locale;

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: savedLanguage,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en/translation.json";
import esTranslation from "./locales/es/translation.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: enTranslation },
      es: { translation: esTranslation },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;

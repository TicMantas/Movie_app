import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import lt from "./locales/lt";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: "en",
  fallbackLng: "en",
  resources: {
    lt, en,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

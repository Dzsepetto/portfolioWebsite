import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import hu from "./locales/hu";
import de from "./locales/de";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  resources: {
    en,
    hu,
    de,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
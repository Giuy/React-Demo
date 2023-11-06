import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import vi from "./assets/translates/vi.json";
import en from "./assets/translates/en.json";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";

const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

// Init i18next
i18n
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .use(I18NextHttpBackend)
  .init({
    // lng: "en",
    supportedLngs: ["vi", "en"],
    fallbackLng: "en",
    debug: true,
    resources,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["path", "cookie", "htmlTag", "localStorage", "subdomain"],
      caches: ["cookie"],
    },
    react: {
      defaultTransParent: "div",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["strong"],
    },
  });

export default i18n;

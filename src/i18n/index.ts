import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import sv from "./locales/sv.json";
import en from "./locales/en.json";

export const SUPPORTED_LANGUAGES = [
  { code: "sv", label: "Svenska", short: "SV" },
  { code: "en", label: "English", short: "EN" },
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]["code"];

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      sv: { translation: sv },
      en: { translation: en },
    },
    fallbackLng: "sv",
    supportedLngs: ["sv", "en"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "dc-lang",
    },
  });

// Keep <html lang> in sync for accessibility & SEO.
const syncHtmlLang = (lng: string) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng;
  }
};
syncHtmlLang(i18n.language || "sv");
i18n.on("languageChanged", syncHtmlLang);

export default i18n;

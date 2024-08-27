import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {},
});

export const addResource: (key: string, value: { [key: string]: string }, namespace?: string) => void
  = (key: string, value: { [key: string]: string }, namespace?: string) => i18n.addResourceBundle(key, namespace || "default", value);

export const getResourceBundle: (key: string, namespace?: string) => any
  = (key: string, namespace?: string) => i18n.getResourceBundle(key, namespace || "default");

export default i18n;
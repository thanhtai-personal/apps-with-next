import { useTranslation } from "react-i18next";
import i18n from "../i18n";


export const useTranslate = () => {
  const { t } = useTranslation();

  return {
    t, i18n
  }
}

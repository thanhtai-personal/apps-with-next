import { makeContext, ContextData } from "@core-ui/react-context";
import i18n from "../i18n";

export enum LanguageKey {
  vi = "vi",
  en = "en",
}

export enum MultiLanguageActionType {
  updateLanguage = "UPDATE_LANGUAGE",
  initState = "INIT_STATE",
}

export enum LanguageCode {
  vi = "vi-VN",
  en = "en-EN",
}

export interface IAction<T, K> {
  type: T,
  payload: K;
}

export interface UpdateLanguagePayload {
  language: LanguageKey;
}

export interface IMultilanguageContext {
  loading?: boolean;
  language?: string;
  languageCode?: string;
}

export const getLanguageCode = (key: LanguageKey) => {
  return LanguageCode[key]
}

type MultilanguageActionPayload = UpdateLanguagePayload & IMultilanguageContext // | {}

const reducer = (state: IMultilanguageContext, action: IAction<MultiLanguageActionType, MultilanguageActionPayload>): IMultilanguageContext => {

  switch (action.type) {
    case MultiLanguageActionType.updateLanguage:
      i18n.changeLanguage(action.payload.language);
      return {
        ...state,
        language: action.payload.language,
        languageCode: getLanguageCode(action.payload.language),
      }
    case MultiLanguageActionType.initState:
      return action.payload
    default:
      return state;
  }
};
// Create the counter context using makeContext
export const MultilanguageContext: ContextData<IMultilanguageContext, IAction<MultiLanguageActionType, MultilanguageActionPayload>> =
  makeContext<IMultilanguageContext, IAction<MultiLanguageActionType, MultilanguageActionPayload>>(reducer, {
    loading: false,
    language: LanguageKey.en,
    languageCode: LanguageCode.en
  });
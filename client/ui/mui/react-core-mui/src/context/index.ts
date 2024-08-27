import { ContextData, makeContext, IAction } from "@core-ui/react-context"
import { createAppTheme } from "../theme";

export enum MuiActionType {
  INIT_STATE = "init_state",
  UPDATE_THEME = "update_theme",
  ADD_THEME = "add_theme"
}

export type ThemeMapping = {
  [key: string]: Partial<typeof createAppTheme>;
}

export interface IMuiContext {
  themeKey?: string;
  themeMapping?: ThemeMapping;
}

type MuiActionPayload = Partial<IMuiContext> & {
  newKey?: string;
  newTheme?: Partial<typeof createAppTheme>;
};

const reducer = (state: IMuiContext, action: IAction<MuiActionType, MuiActionPayload>): IMuiContext => {

  switch (action.type) {
    case MuiActionType.ADD_THEME:
      const newMapping = state.themeMapping || {};
      if (action.payload.newKey && action.payload.newTheme) {
        newMapping[action.payload.newKey] = action.payload.newTheme;
      }
      return {
        ...state,
        themeMapping: newMapping
      }
    case MuiActionType.UPDATE_THEME:
      return {
        ...state,
        themeKey: action.payload.themeKey
      }
    case MuiActionType.INIT_STATE:
      return action.payload;
    default:
      return state;
  }
};

export const MuiContext: ContextData<IMuiContext, IAction<MuiActionType, MuiActionPayload>> =
  makeContext<IMuiContext, IAction<MuiActionType, MuiActionPayload>>(reducer, {}, "Mui");
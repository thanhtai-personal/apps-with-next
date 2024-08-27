import { MantineTheme } from "@mantine/core";
import { ContextData, makeContext, IAction } from "@core-ui/react-context"

export enum MantineActionType {
  INIT_STATE = "init_state",
  UPDATE_THEME = "update_theme",
  ADD_THEME = "add_theme"
}

export type ThemeMapping = {
  [key: string]: Partial<MantineTheme>;
}

export interface ITTCMantineContext {
  themeKey?: string;
  themeMapping?: ThemeMapping;
}

type MantineActionPayload = Partial<ITTCMantineContext> & {
  newKey?: string;
  newTheme?: Partial<MantineTheme>;
};

const reducer = (state: ITTCMantineContext, action: IAction<MantineActionType, MantineActionPayload>): ITTCMantineContext => {

  switch (action.type) {
    case MantineActionType.ADD_THEME:
      const newMapping = state.themeMapping || {};
      if (action.payload.newKey && action.payload.newTheme) {
        newMapping[action.payload.newKey] = action.payload.newTheme;
      }
      return {
        ...state,
        themeMapping: newMapping
      }
    case MantineActionType.UPDATE_THEME:
      return {
        ...state,
        themeKey: action.payload.themeKey
      }
    case MantineActionType.INIT_STATE:
      return action.payload;
    default:
      return state;
  }
};

export const TTCMantineContext: ContextData<ITTCMantineContext, IAction<MantineActionType, MantineActionPayload>> =
  makeContext<ITTCMantineContext, IAction<MantineActionType, MantineActionPayload>>(reducer, {}, "mantine");
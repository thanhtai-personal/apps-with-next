import { ContextData, makeContext, IAction } from "@core-ui/react-context"
import { ReactNode } from "react";

export enum DrawerActionType {
  INIT_STATE = "init_state",
  CLOSE = "close",
  OPEN = "open",
}

export type Position = "left" | "top" | "bottom" | "right"

export interface IDrawerContext {
  languages?: { [key: string]: { [key: string]: string } }; // { [language key]: { [text key]: text value }}
  languageKey?: string;
  themeKey?: string;
  opened?: Position[];
  title?: ReactNode | string;
  content?: ReactNode;
  classes?: {
    container?: string;
  }
}

type DrawerActionPayload = Partial<IDrawerContext> & {
  position?: Position;
};

const reducer = (state: IDrawerContext, action: IAction<DrawerActionType, DrawerActionPayload>): IDrawerContext => {

  switch (action.type) {
    case DrawerActionType.CLOSE:
      return {
        ...state,
        opened: [...((state.opened || []).filter((pos) => pos != action.payload.position))]
      };
    case DrawerActionType.OPEN:
      if (!action.payload.position) return state;
      return {
        ...state,
        opened: [...((state.opened || []).filter((pos) => pos != action.payload.position)), action.payload.position]
      };
    case DrawerActionType.INIT_STATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export const DrawerContext: ContextData<IDrawerContext, IAction<DrawerActionType, DrawerActionPayload>> =
  makeContext<IDrawerContext, IAction<DrawerActionType, DrawerActionPayload>>(reducer, { opened: [] }, "drawer");
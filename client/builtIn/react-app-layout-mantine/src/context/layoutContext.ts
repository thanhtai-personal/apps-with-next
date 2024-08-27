import { ContextData, makeContext, IAction } from "@core-ui/react-context"
import { ReactNode } from "react";

export enum LayoutActionType {
  INIT_STATE = "init_state",
  CLOSE_MENU = "close_menu",
  OPEN_MENU = "open_menu",
}

export enum MenuItemType {
  DIVIDER = "divider",
  LABEL = "label",
  ITEM = "item",
}

export interface IMenuItem {
  id: string | number;
  type?: MenuItemType;
  label?: ReactNode | string;
  icon?: ReactNode;
  path?: string;
  name?: string;
  classes?: {
    icon?: string;
    menuItem?: string;
    activeItem?: string;
    inActiveItem?: string;
  }
}

export interface ILayoutContext {
  languages?: { [key: string]: { [key: string]: string } }; // { [language key]: { [text key]: text value }}
  languageKey?: string;
  themeKey?: string;
  isAllRouteLayout?: boolean;
  logo?: {
    src: string;
    name?: string;
    alt: string;
  },
  logoWhite?: {
    src: string;
    name?: string;
    alt: string;
  },
  defaultAvatar?: string;
  appMenu?: {
    opened?: boolean;
    items?: IMenuItem[];
  },
  classes?: {
    body?: string;
  },
  topMenu?: {
    items?: IMenuItem[];
  },
  topRightGroup?: ReactNode;
}

type LayoutActionPayload = Partial<ILayoutContext> & {
  newKey?: string;
};

const reducer = (state: ILayoutContext, action: IAction<LayoutActionType, LayoutActionPayload>): ILayoutContext => {

  switch (action.type) {
    case LayoutActionType.CLOSE_MENU:
      return {
        ...state,
        appMenu: {
          ...(state.appMenu || {}),
          opened: false,
        }
      };
    case LayoutActionType.OPEN_MENU:
      return {
        ...state,
        appMenu: {
          ...(state.appMenu || {}),
          opened: true,
        }
      };
    case LayoutActionType.INIT_STATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export const LayoutContext: ContextData<ILayoutContext, IAction<LayoutActionType, LayoutActionPayload>> =
  makeContext<ILayoutContext, IAction<LayoutActionType, LayoutActionPayload>>(reducer, {
    appMenu: {
      items: []
    }
  },
    "layout");
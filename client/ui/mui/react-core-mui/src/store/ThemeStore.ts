import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";
import { createAppTheme } from "../theme";

export type ThemeMapping = {
  [key: string]: Partial<typeof createAppTheme>;
}

export interface IThemeStore {
  themeKey?: string;
  themeMapper?: ThemeMapping;
}

export class ThemeStore extends BaseStore implements IThemeStore {
  public themeKey?: any = null;
  public themeMapper?: ThemeMapping = {};

  constructor() {
    super();
    makeObservable(this, {
      themeKey: observable,
      themeMapper: observable,
    });
  }
}
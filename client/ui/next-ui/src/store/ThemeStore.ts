import { BaseStore, makeObservable, observable } from "@core-utils/react-mobx-state";

export type ThemeMapping = {
  [key: string]: any;
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
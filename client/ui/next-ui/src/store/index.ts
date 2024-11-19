import { createStore } from "@core-utils/react-mobx-state";
import { ThemeStore } from "./ThemeStore";

export class MuiCoreStore {
  public themeStore: ThemeStore;

  public constructor() {
    this.themeStore = new ThemeStore();
  }
}

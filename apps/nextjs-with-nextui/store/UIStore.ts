"use client";

import { BaseStore, makeObservable, observable } from "@core-utils/react-mobx-state";

export type ThemeMapping = {
  [key: string]: any;
}

export interface IUIStore {
  useHeader?: boolean;
}

export class UIStore extends BaseStore implements IUIStore {
  public useHeader?: any = true;

  constructor() {
    super();
    makeObservable(this, {
      useHeader: observable,
    });
  }
}
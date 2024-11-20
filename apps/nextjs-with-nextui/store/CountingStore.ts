"use client";

import { BaseStore, makeObservable, observable } from "@core-utils/react-mobx-state";


export interface ICountingStore {
  count: number;
}

export class CountingStore extends BaseStore implements ICountingStore {
  public count: number = 0;

  constructor() {
    super();
    makeObservable(this, {
      count: observable,
    });
  }
}
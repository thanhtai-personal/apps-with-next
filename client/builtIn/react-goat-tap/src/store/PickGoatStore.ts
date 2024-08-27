import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IPickGoatStore {
  error?: any;
  selectedGoat?: any;
}

export class PickGoatStore extends BaseStore implements IPickGoatStore {
  public error?: any = null;
  public selectedGoat?: any = null;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      selectedGoat: observable,
    });
  }
}
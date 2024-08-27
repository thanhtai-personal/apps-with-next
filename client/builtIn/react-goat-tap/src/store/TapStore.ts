import { IFamousPeopleResponse } from "@core-ui/goat-tap-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface ITapStore {
  energy: number;
  error: any;
  famousPeople?: IFamousPeopleResponse;
}

export class TapStore extends BaseStore implements ITapStore {
  public energy: number = 2500;
  public error: any = null;
  public famousPeople?: IFamousPeopleResponse;
  public groupPoints: number = 0;
  public unsyncPoints: number = 0;
  public unsyncEnergy: number = 0;

  constructor() {
    super();
    makeObservable(this, {
      energy: observable,
      error: observable,
      famousPeople: observable,
      groupPoints: observable,
      unsyncPoints: observable,
      unsyncEnergy: observable,
    });
  }
}
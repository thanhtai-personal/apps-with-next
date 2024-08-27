import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";
import bgImage from "@/assets/images/app-bg-1.png";

export enum ModalId {
  superCharge = 1,
  megaCharge = 2,
  boostSuccess = 3,
  searchKOL = 4,
  searchResult = 5,
  gettingPoints = 6
}
export class RevampGameStore extends BaseStore {
  public pageBg: string = bgImage;
  public modalShowing: ModalId | null = null;
  public config: any = {};

  constructor() {
    super();
    makeObservable(this, {
      pageBg: observable,
      modalShowing: observable,
      config: observable
    });
    this.pageBg = bgImage;
  }
}
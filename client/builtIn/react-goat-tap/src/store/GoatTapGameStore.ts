import { IFamousPeopleFilter, IFamousPeopleResponse } from "@core-ui/goat-tap-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";


export enum ModalId {
  superCharge = 1,
  megaCharge = 2,
  boostSuccess = 3,
  searchKOL = 4,
  searchResult = 5,
  gettingPoints = 6,
  connectWallet = 7,
  confirmAutoBoost = 8,
  confirmRefillEnergy = 9,
  walletConnected = 10,
  autoBootWasSent = 11,
  openConfirmModal = 12,
}


export enum SceneNames {
  TAP = 'Tap',
  LEADERBOARD = 'Leaderboard',
  REFERRAL = 'Referral',
  PICK_GOAT = 'PickGoat',
  CHANGE_GOAT = 'ChangeGoat',
  BOOST = 'Boost',
  SQUAD_DETAIL = 'SquadDetail',
  SEARCH = 'Search',
  // QUEST = 'Quest',
  // LUCKY_BONUS = 'LuckyBonus',
  // ONE_VS_ONE = 'OneVsOne',
  NOT_FOUND = 'NotFoundPage',
}

export interface IMessageQueue {
  children: string;
  variant?: "success" | "error" | "info" | "warning"
}
export interface IGoatTapGameStore {
  pageBg: string;
  modalShowing: ModalId | null;
  config?: any;
  famousPeople?: IFamousPeopleResponse[];
  messageQueue?: IMessageQueue[];
  famousPeoplePaging?: any;
  famousPeopleLoading: boolean;
  famousPeopleFilter: IFamousPeopleFilter;
  connectWalletCallback?: () => Promise<void>;
  scene?: SceneNames;
}
export class GoatTapGameStore extends BaseStore implements IGoatTapGameStore {
  public pageBg: string = "";
  public famousPeopleLoading: boolean = false;
  public modalShowing: ModalId | null = null;
  public config: any = {};
  public famousPeople: IFamousPeopleResponse[] = [];
  public messageQueue: IMessageQueue[] = [];
  public connectWalletCallback?: () => Promise<void>;
  public famousPeoplePaging: any = {
    limit: 10,
    offset: 0,
    total: 0,
  };
  public famousPeopleFilter: IFamousPeopleFilter = {
    name: ""
  }
  public scene: SceneNames = SceneNames.PICK_GOAT;

  constructor() {
    super();
    makeObservable(this, {
      pageBg: observable,
      modalShowing: observable,
      config: observable,
      famousPeople: observable,
      messageQueue: observable,
      famousPeoplePaging: observable,
      famousPeopleLoading: observable,
      famousPeopleFilter: observable,
      connectWalletCallback: observable,
      scene: observable,
    });
  }
}
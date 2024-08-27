import { createStore } from "@core-ui/react-mobx-state"
import { GoatTapGameStore } from "./GoatTapGameStore";
import { TapStore } from "./TapStore";
import { AccountStore } from "./AccountStore";
import { LeaderBoardStore } from "./LeaderBoardStore";
import { BoostStore } from "./BoostStore";
import { PickGoatStore } from "./PickGoatStore";

export class GoatTapStore {
  public gameStore: GoatTapGameStore;
  public tapStore: TapStore;
  public accountStore: AccountStore;
  public leaderBoardStore: LeaderBoardStore;
  public boostStore: BoostStore;
  public pickGoatStore: PickGoatStore;

  public constructor() {
    this.gameStore = new GoatTapGameStore();
    this.tapStore = new TapStore();
    this.accountStore = new AccountStore();
    this.leaderBoardStore = new LeaderBoardStore();
    this.boostStore = new BoostStore();
    this.pickGoatStore = new PickGoatStore();
  }
}

export const goatTapStore = createStore<GoatTapStore>(new GoatTapStore());

export const useGoatTapStore = goatTapStore.useStore as () => GoatTapStore;

export * from "./TapStore"
export * from "./BoostStore"
export * from "./GoatTapGameStore"
export * from "./AccountStore"
export * from "./PickGoatStore"
export * from "./Provider"
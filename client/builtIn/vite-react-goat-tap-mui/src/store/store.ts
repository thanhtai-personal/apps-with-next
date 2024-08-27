import { RevampGameStore } from "./RevampGameStore";

export class GoatTapStore {
  public gameStore: RevampGameStore;

  public constructor() {
    this.gameStore = new RevampGameStore();
  }
}

export class GoatTapStoreInjector {
  private static instance: GoatTapStoreInjector | null = null;
  private useStore: () => GoatTapStore;

  private constructor(useStore: () => GoatTapStore) {
    this.useStore = useStore;
  }

  public static getInstance(useStore): GoatTapStoreInjector {
    if (!this.instance) {
      this.instance = new GoatTapStoreInjector(useStore);
    }
    return this.instance;
  }

  public getUseStore = () => {
    return this.useStore;
  }
}
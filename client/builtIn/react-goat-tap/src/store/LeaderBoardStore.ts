import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface ILeaderBoardStore {
  topGoats?: any[];
}

const demoData = [
  {
    avt: "",
    rank: 1,
    prize: 653085890,
    name: "Dont Show Your Cat",
    username: "@DontShowYourCat",
  },
  {
    avt: "",
    rank: 2,
    prize: 434494022,
    name: "Hamster Kombat",
    username: "@hamster_kombat",
  },
  {
    avt: "",
    rank: 3,
    prize: 123482101,
    name: "ThuanCapital.eth",
    username: "@ThuanCapital",
  },
  {
    rank: 4,
    name: "Atonella ✨ 130K ✨ S.P (11) 95858-1662",
    goatToken: 10000000,
    tokenAddress: "0x756689BdEcDE115D37D880E26eb28EfC749a97d7",
  },
  {
    rank: 5,
    name: "Annette Black",
    goatToken: 1000000,
    tokenAddress: "0x756689BdEcDE115D37D880E26eb28EfC749a97d7",
  },
  {
    rank: 6,
    name: "Devon Lane",
    goatToken: 100000,
    tokenAddress: "0x756689BdEcDE115D37D880E26eb28EfC749a97d7",
  },
  {
    rank: 7,
    name: "Ralph Edwards",
    goatToken: 10000,
    tokenAddress: "0x756689BdEcDE115D37D880E26eb28EfC749a97d7",
  },
  {
    rank: 8,
    name: "Eleanor Pena",
    goatToken: 1000,
    tokenAddress: "0x756689BdEcDE115D37D880E26eb28EfC749a97d7",
  },
  {
    rank: 9,
    name: "Eli Gerzon",
    goatToken: 900,
    tokenAddress: "0x756689BdEcDE115D37D880E26eb28EfC749a97d7",
  },
  {
    rank: 10,
    name: "Robert Fox",
    goatToken: 800,
    tokenAddress: "0x756689BdEcDE115D37D880E26eb28EfC749a97d7",
  }
]

export class LeaderBoardStore extends BaseStore implements ILeaderBoardStore {
  public topGoats: any[] = demoData;

  constructor() {
    super();
    makeObservable(this, {
      topGoats: observable,
    });
  }
}
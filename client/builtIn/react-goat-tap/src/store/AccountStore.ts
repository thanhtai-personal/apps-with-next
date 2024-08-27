import { IUserResponse } from "@core-ui/goat-tap-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IAccountStore {
  isAuthenticated: boolean;
  error?: any;
  accessToken?: string;
  chatId?: string;
  isLoading?: boolean;
  firstLogin?: boolean;
  account?: IUserResponse;
  accfriendsount?: IUserResponse[];
}

export class AccountStore extends BaseStore implements IAccountStore {
  public isAuthenticated: boolean = false;
  public error?: any = null;
  public accessToken?: string;
  public chatId?: string;
  public isLoading?: boolean = true;
  public firstLogin?: boolean = true;
  public gettingAuth?: boolean = false;
  public account?: IUserResponse;
  public friends?: IUserResponse[] = [];
  public totalFriends?: number = 0;
  public friendsPaging?: {
    offset: number;
    limit: number;
  } = {
    offset: 0,
    limit: 10,
  }

  constructor() {
    super();
    makeObservable(this, {
      isAuthenticated: observable,
      account: observable,
      error: observable,
      accessToken: observable,
      chatId: observable,
      isLoading: observable,
      gettingAuth: observable,
      friends: observable,
      totalFriends: observable,
      friendsPaging: observable,
    });
  }
}
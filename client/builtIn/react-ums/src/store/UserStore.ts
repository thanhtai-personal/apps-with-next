import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";
import { IUserFilter, IUserResponse } from "@core-ui/ums-types";
import { ISearchQuery, IPagingResponse } from "@core-ui/common-types";

export interface IUserStore {
  error?: any;
  users?: IPagingResponse<IUserResponse>;
  user?: IUserResponse;
  loginData: any;
  filterData?: ISearchQuery<IUserFilter>;
  loading?: boolean;
}

export class UserStore extends BaseStore implements IUserStore {
  public error?: any = null;
  public users?: IPagingResponse<IUserResponse>;
  public user?: IUserResponse;
  public filterData?: ISearchQuery<IUserFilter>;
  public loginData: any = {};
  public loading: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      users: observable,
      loading: observable,
      loginData: observable,
      user: observable,
      filterData: observable,
    });
  }
}
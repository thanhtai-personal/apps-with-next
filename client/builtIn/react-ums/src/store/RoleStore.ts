import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";
import { IRoleFilter, IRoleResponse } from "@core-ui/ums-types";
import { ISearchQuery, IPagingResponse } from "@core-ui/common-types";

export interface IRoleStore {
  error?: any;
  roles?: IPagingResponse<IRoleResponse>;
  role?: IRoleResponse;
  loginData: any;
  filterData?: ISearchQuery<IRoleFilter>;
  loading?: boolean;
}

export class RoleStore extends BaseStore implements IRoleStore {
  public error?: any = null;
  public roles?: IPagingResponse<IRoleResponse>;
  public role?: IRoleResponse;
  public filterData?: ISearchQuery<IRoleFilter>;
  public loginData: any = {};
  public loading: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      roles: observable,
      loading: observable,
      loginData: observable,
      role: observable,
      filterData: observable,
    });
  }
}
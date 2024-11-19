import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";
import { IPermissionFilter, IPermissionResponse } from "@core-ui/ums-types";
import { ISearchQuery, IPagingResponse } from "@core-ui/common-types";

export interface IPermissionStore {
  error?: any;
  permissions?: IPagingResponse<IPermissionResponse>;
  permission?: IPermissionResponse;
  loginData: any;
  filterData?: ISearchQuery<IPermissionFilter>;
  loading?: boolean;
}

export class PermissionStore extends BaseStore implements IPermissionStore {
  public error?: any = null;
  public permissions?: IPagingResponse<IPermissionResponse>;
  public permission?: IPermissionResponse;
  public filterData?: ISearchQuery<IPermissionFilter>;
  public loginData: any = {};
  public loading: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      permissions: observable,
      loading: observable,
      loginData: observable,
      permission: observable,
      filterData: observable,
    });
  }
}
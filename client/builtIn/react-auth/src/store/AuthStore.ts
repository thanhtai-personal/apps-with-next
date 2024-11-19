import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";
import { ILoginRequest, IRegisterRequest, IResetPasswordRequest } from "@core-ui/ums-types";

export interface IAuthStore {
  error?: any;
  loading?: boolean;
  authData?: any;
  loginData: ILoginRequest;
  registerData: IRegisterRequest;
  resetPasswordData?: IResetPasswordRequest;
  wasFinishedValidate?: boolean;
}

export class AuthStore extends BaseStore implements IAuthStore {
  public error?: any = null;
  public authData: any;
  public loginData: ILoginRequest = {} as ILoginRequest;
  public registerData: IRegisterRequest = {} as IRegisterRequest;
  public resetPasswordData?: IResetPasswordRequest;
  public loading?: boolean = false; 
  public wasFinishedValidate?: boolean = false; 

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      authData: observable,
      loading: observable,
      loginData: observable,
      registerData: observable,
      resetPasswordData: observable,
      wasFinishedValidate: observable,
    });
  }
}
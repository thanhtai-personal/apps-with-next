import { ContextData, makeContext, IAction } from "@core-ui/react-context"

export enum AuthActionType {
  INIT_STATE = "init_state",
}

export interface IUser {
  id: string;
  name?: string;
  image?: string;
}

export interface IAuthContext {
  user?: IUser
}

type AuthActionPayload = Partial<IAuthContext>;

const reducer = (state: IAuthContext, action: IAction<AuthActionType, AuthActionPayload>): IAuthContext => {

  switch (action.type) {
    case AuthActionType.INIT_STATE:
      return action.payload;
    default:
      return state;
  }
};

export const AuthContext: ContextData<IAuthContext, IAction<AuthActionType, AuthActionPayload>> =
  makeContext<IAuthContext, IAction<AuthActionType, AuthActionPayload>>(reducer, {
    user: { //TODO: GET INFO BY AUTHEN SDK Later
      id: "test",
      name: "test",
      image: "",
    }
  },
    "authentication");
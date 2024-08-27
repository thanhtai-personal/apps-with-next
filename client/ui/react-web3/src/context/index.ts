import { ContextData, makeContext, IAction } from "@core-ui/react-context"

export enum MetamaskConnectionActionType {
  INIT_STATE = "init_state",
}

export interface IMetamaskConnectionContext {
  config?: any;
}

type MetamaskConnectionActionPayload = Partial<IMetamaskConnectionContext> & any;

const reducer = (state: IMetamaskConnectionContext & any, action: IAction<MetamaskConnectionActionType, MetamaskConnectionActionPayload>): IMetamaskConnectionContext => {

  switch (action.type) {
    case MetamaskConnectionActionType.INIT_STATE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export const MetamaskConnectionContext: ContextData<IMetamaskConnectionContext, IAction<MetamaskConnectionActionType, MetamaskConnectionActionPayload>> =
  makeContext<IMetamaskConnectionContext, IAction<MetamaskConnectionActionType, MetamaskConnectionActionPayload>>(reducer, {}, "MetamaskConnection");
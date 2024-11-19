import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IMessage {
  variant: "error" | "success" | "warning" | "info" | string;
  children: string;
}

export interface INotifyStore {
  messageQueue?: IMessage[];
}

export class NotifyStore extends BaseStore implements INotifyStore {
  public messageQueue?: IMessage[] = [];

  constructor() {
    super();
    makeObservable(this, {
      messageQueue: observable,
    });
  }
}
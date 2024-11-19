import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export type MessageVariant = "error" | "success" | "warning" | "info" | string;

export interface IMessage {
  variant: MessageVariant;
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
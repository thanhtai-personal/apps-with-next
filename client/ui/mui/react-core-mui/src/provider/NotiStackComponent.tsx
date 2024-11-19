import React from "react";
import NotiStack, { NotiMessage } from "../components/NotiStack";

class NotiStackInstanceClass {
  private static instance: NotiStackInstanceClass;
  private _confirmModalRef: any = null;

  private constructor() {}

  static getInstance(): NotiStackInstanceClass {
    if (!NotiStackInstanceClass.instance) {
      NotiStackInstanceClass.instance = new NotiStackInstanceClass();
    }
    return NotiStackInstanceClass.instance;
  }

  setRef(ref: any) {
    this._confirmModalRef = ref;
  }

  addMessage(message: NotiMessage) {
    this._confirmModalRef && this._confirmModalRef.addMessage(message);
  }
}

export const NotiStackInstance = NotiStackInstanceClass.getInstance();

export const NotiStackComponent = React.forwardRef((props, ref) => {
  NotiStackInstance.setRef(ref);
  return <NotiStack ref={ref} {...props} />;
});
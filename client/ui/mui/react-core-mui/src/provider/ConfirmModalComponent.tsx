import { ConfirmModalMessage } from "../components";
import React from "react";
import ConfirmModal from "../components/ConfirmModal";

class ConfirmModalInstanceClass {
  private static instance: ConfirmModalInstanceClass;
  private _confirmModalRef: any = null;

  private constructor() {}

  static getInstance(): ConfirmModalInstanceClass {
    if (!ConfirmModalInstanceClass.instance) {
      ConfirmModalInstanceClass.instance = new ConfirmModalInstanceClass();
    }
    return ConfirmModalInstanceClass.instance;
  }

  setRef(ref: any) {
    this._confirmModalRef = ref;
  }

  addMessage(message: ConfirmModalMessage) {
    this._confirmModalRef && this._confirmModalRef.addMessage(message);
  }
}

export const ConfirmModalInstance = ConfirmModalInstanceClass.getInstance();


export const ConfirmModalComponent = React.forwardRef((props, ref) => {
  ConfirmModalInstance.setRef(ref);
  return <ConfirmModal ref={ref} {...props} />;
});
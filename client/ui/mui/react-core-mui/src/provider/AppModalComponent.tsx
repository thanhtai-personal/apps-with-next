import React from "react";
import AppModal from "../components/AppModal";

class AppModalInstanceClass {
  private static instance: AppModalInstanceClass;
  private _appModalRef: any = null;

  private constructor() {}

  static getInstance(): AppModalInstanceClass {
    if (!AppModalInstanceClass.instance) {
      AppModalInstanceClass.instance = new AppModalInstanceClass();
    }
    return AppModalInstanceClass.instance;
  }

  setRef(ref: any) {
    this._appModalRef = ref;
  }

  addModal(props: {
    id?: string;
    childrenComponent?: React.ReactNode;
    modalProps?: any;
    closeCallback?: () => void;
    disabledBackdrop?: boolean;
    disableCloseable?: boolean;
    dialogContentProps?: any;
  }) {
    this._appModalRef && this._appModalRef.addModal(props);
  }

  closeModal(keyModal: string) {
    this._appModalRef && this._appModalRef.closeModal(keyModal);
  }
}

export const AppModalComponent = React.forwardRef((props, ref) => {
  AppModalInstanceClass.getInstance().setRef(ref);
  return <AppModal ref={ref} {...props} />;
});

import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

class UIStore extends BaseStore {
  @observable public pageLoading = false;
  @observable public useHeader = false;
  @observable public useBottomMenu = false;
  @observable public clipboardText = "";
  @observable public loadingStatus: string = "";

  constructor() {
    super();
    makeObservable(this);
  }

}

export default UIStore;

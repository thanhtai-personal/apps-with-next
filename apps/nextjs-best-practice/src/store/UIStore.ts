import { THEME } from "@/utils/helper";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IUIStore {
  pageLoading: boolean;
  theme: THEME;
}

class UIStore extends BaseStore implements IUIStore {
  @observable public pageLoading = false;
  @observable public theme = THEME.LIGHT;

  constructor() {
    super();
    makeObservable(this);
  }

}

export default UIStore;

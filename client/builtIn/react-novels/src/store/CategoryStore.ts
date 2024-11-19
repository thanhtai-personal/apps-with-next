import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";
import { ICategoryFilter, ICategoryResponse } from "@core-ui/novels-types";
import { ISearchQuery, IPagingResponse } from "@core-ui/common-types";

export interface ICategoryStore {
  error?: any;
  categories?: IPagingResponse<ICategoryResponse>;
  category?: ICategoryResponse;
  filterData?: ISearchQuery<ICategoryFilter>;
  loading?: boolean;
}

export class CategoryStore extends BaseStore implements ICategoryStore {
  public error?: any = null;
  public categories?: IPagingResponse<ICategoryResponse>;
  public category?: ICategoryResponse;
  public filterData?: ISearchQuery<ICategoryFilter>;
  public loading: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      categories: observable,
      loading: observable,
      category: observable,
      filterData: observable,
    });
  }
}
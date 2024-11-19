import { ICategoryFilter, ICategoryResponse } from "@core-ui/recruiter-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";
import { ISearchQuery, IPagingResponse } from "@core-ui/common-types";

export interface ICategoryStore {
  error?: any;
  categories?: IPagingResponse<ICategoryResponse>;
  category?: ICategoryResponse;
  filterData?: ISearchQuery<ICategoryFilter>;
  activeCateId?: number;
  loading?: boolean;
}

export class CategoryStore extends BaseStore implements ICategoryStore {
  public error?: any = null;
  public categories?: IPagingResponse<ICategoryResponse>;
  public category?: ICategoryResponse;
  public filterData?: ISearchQuery<ICategoryFilter>;
  public activeCateId?: number;
  public loading: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      categories: observable,
      category: observable,
      filterData: observable,
      loading: observable,
      activeCateId: observable,
    });
  }
}
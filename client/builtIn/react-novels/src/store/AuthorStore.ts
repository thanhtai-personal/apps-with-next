import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";
import { IAuthorFilter, IAuthorResponse } from "@core-ui/novels-types";
import { ISearchQuery, IPagingResponse } from "@core-ui/common-types";

export interface IAuthorStore {
  error?: any;
  authors?: IPagingResponse<IAuthorResponse>;
  author?: IAuthorResponse;
  filterData?: ISearchQuery<IAuthorFilter>;
  loading?: boolean;
}

export class AuthorStore extends BaseStore implements IAuthorStore {
  public error?: any = null;
  public authors?: IPagingResponse<IAuthorResponse>;
  public author?: IAuthorResponse;
  public filterData?: ISearchQuery<IAuthorFilter>;
  public loading: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      authors: observable,
      loading: observable,
      author: observable,
      filterData: observable,
    });
  }
}
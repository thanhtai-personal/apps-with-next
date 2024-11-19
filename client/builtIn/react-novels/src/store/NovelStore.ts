import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";
import { INovelFilter, INovelResponse } from "@core-ui/novels-types";
import { ISearchQuery, IPagingResponse } from "@core-ui/common-types";

export interface INovelStore {
  error?: any;
  novels?: IPagingResponse<INovelResponse>;
  novel?: INovelResponse;
  filterData?: ISearchQuery<INovelFilter>;
  loading?: boolean;
}

export class NovelStore extends BaseStore implements INovelStore {
  public error?: any = null;
  public novels?: IPagingResponse<INovelResponse>;
  public novel?: INovelResponse;
  public filterData?: ISearchQuery<INovelFilter>;
  public loading: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      novels: observable,
      loading: observable,
      novel: observable,
      filterData: observable,
    });
  }
}
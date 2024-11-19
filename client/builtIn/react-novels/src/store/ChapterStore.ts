import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";
import { IChapterFilter, IChapterResponse } from "@core-ui/novels-types";
import { ISearchQuery, IPagingResponse } from "@core-ui/common-types";

export interface IChapterStore {
  error?: any;
  chapters?: IPagingResponse<IChapterResponse>;
  chapter?: IChapterResponse;
  filterData?: ISearchQuery<IChapterFilter>;
  loading?: boolean;
}

export class ChapterStore extends BaseStore implements IChapterStore {
  public error?: any = null;
  public chapters?: IPagingResponse<IChapterResponse>;
  public chapter?: IChapterResponse;
  public filterData?: ISearchQuery<IChapterFilter>;
  public loading: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      chapters: observable,
      loading: observable,
      chapter: observable,
      filterData: observable,
    });
  }
}
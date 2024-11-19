import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";
import { ICommentFilter, ICommentResponse } from "@core-ui/novels-types";
import { ISearchQuery, IPagingResponse } from "@core-ui/common-types";

export interface ICommentStore {
  error?: any;
  comments?: IPagingResponse<ICommentResponse>;
  comment?: ICommentResponse;
  filterData?: ISearchQuery<ICommentFilter>;
  loading?: boolean;
}

export class CommentStore extends BaseStore implements ICommentStore {
  public error?: any = null;
  public comments?: IPagingResponse<ICommentResponse>;
  public comment?: ICommentResponse;
  public filterData?: ISearchQuery<ICommentFilter>;
  public loading: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      comments: observable,
      loading: observable,
      comment: observable,
      filterData: observable,
    });
  }
}
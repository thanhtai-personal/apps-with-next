import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";
import { IJobFilter, IJobResponse } from "@core-ui/recruiter-types";
import { ISearchQuery, IPagingResponse, IPagination } from "@core-ui/common-types";

export interface IJobStore {
  error?: any;
  jobs?: IPagingResponse<IJobResponse>;
  job?: IJobResponse;
  loginData: any;
  filterData?: ISearchQuery<IJobFilter>;
  loading?: boolean;
  savedJobs?: IJobResponse[];
  selectedJobs?: IJobResponse[];
  pagingFilterData?: any;
}

export class JobStore extends BaseStore implements IJobStore {
  public error?: any = null;
  public jobs?: IPagingResponse<IJobResponse>;
  public job?: IJobResponse;
  public filterData?: ISearchQuery<IJobFilter>;
  public loginData: any = {};
  public loading: boolean = false;
  public savedJobs?: IJobResponse[];
  public selectedJobs?: IJobResponse[];
  public pagingFilterData?: IPagination;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      jobs: observable,
      loading: observable,
      loginData: observable,
      job: observable,
      filterData: observable,
      savedJobs: observable,
      selectedJobs: observable,
      pagingFilterData: observable,
    });
  }
}
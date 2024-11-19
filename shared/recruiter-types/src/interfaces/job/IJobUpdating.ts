import { IJob } from "./IJob";

export interface IJobUpdating extends Omit<IJob
  , "createdAt" | "updatedAt" | "deletedAt"
> { }

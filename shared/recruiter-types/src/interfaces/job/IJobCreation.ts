import { IJob } from "./IJob";

export interface IJobCreation extends Omit<
  IJob,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> { }
  
import { IThingEntity } from "@core-modules/core"

export interface IJob extends IThingEntity {
  jobId?: string;
  thumb?: string;
  name?: string;
  goldRef?: string;
  goldItv?: string;
  shareUrl?: string;
  cvInprogress?: string;
  cvPassed?: string;
  grossSalary?: string;
  number?: string;
  position?: string;
  level?: string;
  engLevel?: string;
  jobType?: string;
  summary?: string;
  skills?: string;
  prioritySkills?: string;
  profit?: string;
  itvProcess?: string;
  note?: string;
  htmlInfo?: string;
  companyName?: string;
}
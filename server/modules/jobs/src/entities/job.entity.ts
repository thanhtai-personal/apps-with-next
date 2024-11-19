import { Column, Entity } from "@core-api/nest-typeorm-postgres";
import { IJob } from "../interfaces";
import { ThingEntity } from "@core-modules/core"

@Entity('jobs')
export class JobEntity extends ThingEntity implements IJob {
  @Column({ name: "job_id", type: 'varchar', nullable: true })
  jobId?: string;

  @Column({ name: "thumb", type: 'varchar', nullable: true })
  thumb?: string;

  @Column({ name: "name", type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: "gold_ref", type: 'varchar', nullable: true })
  goldRef?: string;

  @Column({ name: "gold_itv", type: 'varchar', nullable: true })
  goldItv?: string;

  @Column({ name: "share_url", type: 'varchar', nullable: true })
  shareUrl?: string;

  @Column({ name: "cv_inprogress", type: 'varchar', nullable: true })
  cvInprogress?: string;

  @Column({ name: "cv_passed", type: 'varchar', nullable: true })
  cvPassed?: string;

  @Column({ name: "gross_salary", type: 'varchar', nullable: true })
  grossSalary?: string;

  @Column({ name: "number", type: 'varchar', nullable: true })
  number?: string;

  @Column({ name: "position", type: 'varchar', nullable: true })
  position?: string;

  @Column({ name: "level", type: 'varchar', nullable: true })
  level?: string;

  @Column({ name: "eng_level", type: 'varchar', nullable: true })
  engLevel?: string;

  @Column({ name: "job_type", type: 'varchar', nullable: true })
  jobType?: string;

  @Column({ name: "summary", type: 'varchar', nullable: true })
  summary?: string;

  @Column({ name: "skills", type: 'varchar', nullable: true })
  skills?: string;

  @Column({ name: "priority_skills", type: 'varchar', nullable: true })
  prioritySkills?: string;

  @Column({ name: "profit", type: 'varchar', nullable: true })
  profit?: string;

  @Column({ name: "itv_process", type: 'varchar', nullable: true })
  itvProcess?: string;

  @Column({ name: "note", type: 'varchar', nullable: true })
  note?: string;

  @Column({ name: "html_info", type: 'varchar', nullable: true })
  htmlInfo?: string;

  @Column({ name: "company_name", type: 'varchar', nullable: true })
  companyName?: string;
}
import { Entity, ManyToOne } from "@core-api/nest-typeorm-postgres";
import { JobEntity as CoreJobEntity } from "@core-modules/jobs"
import { CategoryEntity } from "./category.entity";

@Entity('jobs')
export class JobEntity extends CoreJobEntity {
  @ManyToOne(() => CategoryEntity, (cate) => cate.jobs, { cascade: true })
  categoryData?: CategoryEntity;
}
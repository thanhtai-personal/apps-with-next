import { Entity, ManyToOne, OneToMany } from "@core-api/nest-typeorm-postgres";
import { CategoryEntity as CoreCategoryEntity } from "@core-modules/categories"
import { JobEntity } from "./job.entity";

@Entity('categories')
export class CategoryEntity extends CoreCategoryEntity {
  
  @ManyToOne(() => CategoryEntity, (cate) => cate.categories, { cascade: false })
  category?: CategoryEntity;

  @OneToMany(() => CategoryEntity, (cate) => cate.category, { cascade: true })
  categories?: CategoryEntity[];
  
  @OneToMany(() => JobEntity, (job) => job.categoryData, { eager: false, cascade: false })
  jobs?: JobEntity[];

}
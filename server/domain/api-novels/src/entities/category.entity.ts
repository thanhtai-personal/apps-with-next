import { Entity, ManyToOne, OneToMany } from "@core-api/nest-typeorm-postgres";
import { CategoryEntity as CoreCategoryEntity } from "@core-modules/categories"
import { NovelEntity } from "./novel.entity";

@Entity('categories')
export class CategoryEntity extends CoreCategoryEntity {

  @ManyToOne(() => CategoryEntity, (cate) => cate.categories, { cascade: false })
  category?: CategoryEntity;

  @OneToMany(() => CategoryEntity, (cate) => cate.category, { cascade: true })
  categories?: CategoryEntity[];
  
  @OneToMany(() => NovelEntity, (novel) => novel.categoryData, { eager: false, cascade: false })
  novelsData?: NovelEntity[];
}
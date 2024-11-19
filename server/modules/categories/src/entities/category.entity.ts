import { Column, Entity } from "@core-api/nest-typeorm-postgres";
import { ICategory } from "../interfaces";
import { ThingEntity } from "@core-modules/core"

@Entity('categories')
export class CategoryEntity extends ThingEntity implements ICategory {
  @Column({ name: "name", type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: "description", type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: "image", type: 'varchar', nullable: true })
  image?: string;

  @Column({ name: "icon", type: 'varchar', nullable: true })
  icon?: string;
}
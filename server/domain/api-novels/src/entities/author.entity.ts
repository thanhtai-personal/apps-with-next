import { Entity, OneToMany, OneToOne } from "@core-api/nest-typeorm-postgres";
import { AuthorEntity as CoreAuthorEntity } from "@core-modules/authors"
import { NovelEntity } from "./novel.entity";

@Entity('authors')
export class AuthorEntity extends CoreAuthorEntity {
  @OneToOne(() => AuthorEntity, { cascade: true })
  author?: AuthorEntity;

  @OneToMany(() => NovelEntity, (novel) => novel.authorData, { cascade: false })
  novelsData?: NovelEntity[];
}
import { AuthModule } from "./auth/auth.module";
import { AuthorModule } from "./author/author.module";
import { ChapterModule } from "./chapter/chapter.module";
import { CommentModule } from "./comment/comment.module";
import { JobModule } from "./job/job.module";
import { NovelModule } from "./novel/novel.module";
import { NovelCategoryModule } from "./novelCategory/category.novel.module";
import { PermissionModule } from "./permission/permission.module";
import { RecruiterCategoryModule } from "./recruiterCategory/category.recruiter.module";
import { RoleModule } from "./role/role.module";
import { UserModule } from "./user/user.module";
import { CrawlerModule } from "./crawler/crawler.module";

export const allModule = [
  AuthModule,
  AuthorModule,
  ChapterModule,
  CommentModule,
  NovelModule,
  NovelCategoryModule,
  PermissionModule,
  RecruiterCategoryModule,
  RoleModule,
  UserModule,
  JobModule,
  CrawlerModule
]
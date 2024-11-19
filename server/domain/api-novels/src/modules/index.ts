import { DbModule } from "@/database";
import { NovelsModule } from "./novel/novels.module";
import { AuthorsModule } from "./author/authors.module";
import { CommentsModule } from "./comment/comments.module";
import { ChaptersModule } from "./chapter/chapters.module";
import { CategoriesModule } from "./category/categories.module";
import { CrawlerModule } from "./crawler/crawler.module";

export const allModule = [
  DbModule,
  NovelsModule,
  AuthorsModule,
  CommentsModule,
  ChaptersModule,
  CategoriesModule,
  CrawlerModule,
]
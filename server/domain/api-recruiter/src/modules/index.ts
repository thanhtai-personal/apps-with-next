import { DbModule } from "@/database";
import { CategoriesModule } from "./category/categories.module";
import { CrawlerModule } from "./crawler/crawler.module";
import { JobsModule } from "./job/jobs.module";

export const allModule = [
  DbModule,
  CategoriesModule,
  CrawlerModule,
  JobsModule
]
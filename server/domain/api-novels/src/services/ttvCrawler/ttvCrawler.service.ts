import { AuthorEntity, CategoryEntity, ChapterEntity, CommentEntity, NovelEntity } from '@/entities';
import { NEST_COMMON } from "@core-api/nest-core";
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import axios from 'axios';
import * as cheerio from 'cheerio';

const { Injectable } = NEST_COMMON

const waitMs = (msDuration: number) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(null);
    }, msDuration);
  });
};

@Injectable()
export class TTVCrawlerService {
  private isCrawling: boolean;

  constructor(
    @InjectRepository(NovelEntity)
    private novelRepo: Repository<NovelEntity>,
    @InjectRepository(ChapterEntity)
    private chapterRepo: Repository<ChapterEntity>,
    @InjectRepository(AuthorEntity)
    private authorRepo: Repository<AuthorEntity>,
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {
    this.isCrawling = false;
  }

  // @Cron("0 */2 * * * *") //2 mins
  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  // updateEveryNight() {
  //   this.crawlData();
  // }

  async crawlData() {
    try {
      await this.crawlTTV(true)
    } catch (error) {
      console.error('Error crawl data:', error);
    }
  }

  async crawlTTV(isUpdateOnly: boolean = false) {
    if (this.isCrawling) return;
    this.isCrawling = true;
    try {
      if (isUpdateOnly) {
        console.log("========Crawl update only=====");
      }
      if (!isUpdateOnly) await this.ttvClassifies();

      let listNovels = await this.novelRepo.find({ relations: ['authorData', 'categoryData'], where: { deletedAt: undefined } });
      if (!isUpdateOnly) {
        listNovels = (await this.crawlTTVNovels()).listNovels
      }

      console.log("====START CRAWL NOVELS DETAIL");
      for (const novel of listNovels) {
        if (!novel || !novel.referrence) continue;
        if (novel.isFull) {
          console.log("Novel is full, skip crawl chapters: ", novel.name);
          continue;
        }
        console.log("Current novel is: ", novel.name);
        const pageHtmlString: string = (await axios.get(novel.referrence!)).data;
        console.log("URL crawling", novel.referrence);
        const $novel = cheerio.load(pageHtmlString);
        const novelId = $novel('meta[name="book_detail"]')?.attr('content')?.trim();
        console.log("novelId", novelId)
        if (!novelId) {
          console.log("Novel id not found")
          continue;
        }
        novel.originalNovelId = novelId;
        await this.crawlTTVNovelData($novel, novel)
      }

      console.log("SUCCESS - FINISHED CRAWLS DATA")
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    } finally {
      this.isCrawling = false;
    }
  }

  async ttvClassifies() {
    const origin = 'https://truyen.tangthuvien.vn';
    const htmlString: string = (await axios.get(origin)).data;
    const $ = cheerio.load(htmlString);

    // Select the anchor tags inside the classify list
    const classifies = $('div.classify-list a');
    const categories: { name: string; url: string; count?: number; icon: string; }[] = [];
    const savedCategories: any = []

    // Iterate over each anchor element to extract data
    for (const element of classifies) {
      const name = $(element).find('i').text().trim();
      const url = $(element).attr('href') || '';
      const icon = $(element).find('.iconfont').text();
      const countText = $(element).find('b').text().trim();
      const count = countText ? parseInt(countText, 10) : 0;

      // Push the extracted data into the categories array
      categories.push({ name, url, count, icon });
      console.log("===HANDLE CATEGORY", name);
      try {
        const findExisting = await this.categoryRepo.findOne({ where: { name: name }, relations: ['categories'] })
        if (!findExisting) {
          const savedCategory = await this.categoryRepo.create({
            name,
            icon,
            description: url,
          })
          await this.categoryRepo.save(savedCategory)
          savedCategories.push(savedCategory)
        }
      } catch (error) {
        console.log("===SAVE CATEGORY FAILED", name);
      }
    }

    return {
      savedCategories,
      categories
    }
  }

  async crawlTTVNovels(): Promise<any> {
    const novelsPage = 'https://truyen.tangthuvien.vn/tong-hop?ctg=1'
    console.log("URL crawling", novelsPage);
    try {
      const novelsHtmlString: string = (await axios.get(novelsPage)).data;
      const $novels = cheerio.load(novelsHtmlString);
      const pageNumberElements: any = $novels("ul.pagination li a");
      const totalPages = parseInt(pageNumberElements[pageNumberElements.length - 2]?.children?.[0]?.data, 10);
      const pageUrls = [];
      const listNovels = [];
      for (let page = 1; page <= totalPages; page++) {
        pageUrls.push(`${novelsPage}&page=${page}`);
      }

      for (const pageUrl of pageUrls) {
        console.log("URL crawling", pageUrl);
        const pageHtmlString: string = (await axios.get(pageUrl)).data;
        const $page = cheerio.load(pageHtmlString);
        const novelElements: any = $page("div.book-img-text ul li");
        for (const element of novelElements) {
          const name = $page(element).find('h4 a').text().trim();
          const author = $page(element).find('p.author a.name').text().trim();
          const category = ($page(element).find('p.author a')?.[1] as any)?.children?.[0]?.data;
          const intro = $page(element).find('p.intro').text().trim();
          // const updatedTime = $page(element).find('p.update span').text().trim();
          const thumb = ($page(element).find('img.lazy')?.[0] as any)?.attribs?.src;
          const url = ($page(element).find('h4 a')?.[0] as any)?.attribs?.href;
          console.log("===HANDLE Novel", name);

          let existingAuthor = await this.authorRepo.findOne({ where: { name: author } });
          if (!existingAuthor) {
            existingAuthor = await this.authorRepo.create({
              name: author,
            })
            existingAuthor = await this.authorRepo.save(existingAuthor);
          }

          let existingCategory = await this.categoryRepo.findOne({ where: { name: category }, relations: ['categories'] });
          if (!existingCategory) {
            existingCategory = this.categoryRepo.create({
              name: category,
            })
            existingCategory = await this.categoryRepo.save(existingCategory);
          }

          let existingNovel = await this.novelRepo.findOne({ where: { name }, relations: ['authorData', 'categoryData', 'chaptersData'] });
          if (!existingNovel) {
            try {
              existingNovel = await this.novelRepo.create({
                name,
                shortDescription: intro,
                thumb,
                referrence: url,
                authorData: existingAuthor,
                categoryData: existingCategory,
              });
              existingNovel = await this.novelRepo.save(existingNovel);
              console.log("Saved Novel", name)
            } catch (error: any) {
              console.log("FAILED", error.message)
            }
          } else {
            console.log("IGNORE - Exist novel name")
          }
          listNovels.push(existingNovel);
        }
      }
      console.log("SUCCESS - FINISHED CRAWLS NOVELS DATA");
      return {
        listNovels
      }
    } catch (error: any) {
      console.log("====Get list novels error =====", error.message);
    }
  }

  async crawlTTVNovelData($novel: cheerio.Root, novel: NovelEntity) {
    try {
      const fullIntro = $novel('.book-info-detail .book-intro p').text().trim();
      novel.fullDescription = fullIntro;
      const bookIntro = $novel('.book-info');
      const contentElements: any = $novel(bookIntro).find('p em span');
      novel.view = Number(contentElements?.[0]?.children?.[0]?.data);
      novel.like = Number(contentElements?.[1]?.children?.[0]?.data)
      novel.follow = Number(contentElements?.[2]?.children?.[0]?.data)
      novel.suggest = Number(contentElements?.[3].children?.[0]?.data)
      await this.novelRepo.save(novel);
      await this.crawlTTVChapters(novel);
    } catch (error: any) {
      console.log("save novel id error", error.message)
    }
  }

  async crawlTTVChapters(novel: NovelEntity) {
    const chapterUrl = `https://truyen.tangthuvien.vn/doc-truyen/page/${novel.originalNovelId}?page=0&limit=99999999999&web=1`
    console.log("URL crawling", chapterUrl);
    const chaptersHtmlString: string = (await axios.get(chapterUrl)).data;
    const $chapters = cheerio.load(chaptersHtmlString);
    const listChapterElements = $chapters("ul li");
    let currentIndex = 0;
    const countChapters = await this.chapterRepo.count({ where: { novelData: { id: novel.id } } });
    if (countChapters > 0) {
      console.log("Chapters already exist for Novel", novel.name);
      if (listChapterElements.length <= countChapters) {
        console.log("All chapters existed");
        return;
      } else {
        currentIndex = countChapters;
      }
    }
    for (const chapterElementIdx in listChapterElements) {
      if (Number(chapterElementIdx) < currentIndex) continue;
      try {
        const chapterElement = listChapterElements[chapterElementIdx];
        const chapterUrl2 = $chapters(chapterElement).find("a").attr("href");
        if (!chapterUrl2) {
          console.log("No chapter url found")
          continue;
        }
        const existingChapter = await this.chapterRepo.findOne({
          where: {
            referrence: chapterUrl2,
          }
        })
        if (!!existingChapter) {
          console.log("Existed chapter: ", chapterUrl2)
          continue;
        }
        await this.crawlTTVChapterData($chapters, chapterElement, novel, chapterElementIdx, chapterUrl2)
      } catch (error: any) {
        console.log("save chapter error", chapterElementIdx, error.message);
      }
    }
  }

  async crawlTTVChapterData($chapters: cheerio.Root, chapterElement: cheerio.Element | undefined
    , novel: NovelEntity, chapterElementIdx: string | number, chapterUrl2: string,
  ) {
    const chapterName = $chapters(chapterElement).find("a").attr("title");
    let existingChapter = await this.chapterRepo.findOne({
      where: {
        referrence: chapterUrl2,
        name: chapterName
      },
      relations: ['novelData', 'comments']
    })
    if (!existingChapter) {
      existingChapter = await this.chapterRepo.create({
        referrence: chapterUrl2,
        name: chapterName,
        novelData: novel,
        chapterIndex: Number(chapterElementIdx) + 1,
      })
    }

    if (!existingChapter.content && chapterUrl2) {
      const chaptersHtmlString: string = (await axios.get(chapterUrl2)).data;
      console.log("URL crawling", chapterUrl2);
      waitMs(10);
      const $chapterContent = cheerio.load(chaptersHtmlString);
      const chapterContent = $chapterContent("div.box-chap").text().trim();
      existingChapter.content = chapterContent;
    }
    if (!existingChapter.novelData?.id) {
      console.log("Failed. Update chapter without novel id", chapterUrl2);
      return;
    }
    await this.chapterRepo.save(existingChapter);
    console.log("save chapter success", existingChapter.name);
  }

}
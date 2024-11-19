import { BaseSDK } from "@core-sdk/core";
import {
  NovelCategoryService,
  RecruiterCategoryService,
  ChapterService,
  NovelService,
  CommentService,
  AuthorService,
  RoleService,
  UserService,
  JobService,
  PermissionService,
  CrawlerService,
  AuthService
} from "./services";
import {
  CreateApiConfig,
} from "./types";
import {
  ICategoryCreation as IRecruiterCategoryCreation,
  ICategoryFilter as IRecruiterCategoryFilter,
  ICategoryResponse as IRecruiterCategoryResponse,
  ICategoryUpdating as IRecruiterCategoryUpdating,
  IJobCreation,
  IJobFilter,
  IJobResponse,
  IJobUpdating,
} from "@core-ui/recruiter-types"
import {
  ICategoryCreation as INovelsCategoryCreation,
  ICategoryFilter as INovelsCategoryFilter,
  ICategoryResponse as INovelsCategoryResponse,
  ICategoryUpdating as INovelsCategoryUpdating,
  IAuthorCreation,
  IAuthorFilter,
  IAuthorResponse,
  IAuthorUpdating,
  INovelCreation,
  INovelFilter,
  INovelResponse,
  INovelUpdating,
  IChapterCreation,
  IChapterFilter,
  IChapterResponse,
  IChapterUpdating,
  ICommentCreation,
  ICommentFilter,
  ICommentResponse,
  ICommentUpdating,
} from "@core-ui/novels-types"
import {
  IUserResponse,
  IUserCreation,
  IUserUpdating,
  IUserFilter,
  IRoleCreation,
  IRoleFilter,
  IRoleResponse,
  IRoleUpdating,
  IPermissionCreation,
  IPermissionFilter,
  IPermissionResponse,
  IPermissionUpdating,
  ILoginRequest,
  IResetPasswordRequest,
  IRegisterRequest,
} from "@core-ui/ums-types"
import { ISearchQuery } from "@core-ui/common-types";

export class AppcenterSDK extends BaseSDK {
  private static instance: AppcenterSDK | null = null;
  private userService: UserService;
  private novelCategoryService: NovelCategoryService;
  private recruiterCategoryService: RecruiterCategoryService;
  private roleService: RoleService;
  private permissionService: PermissionService;
  private jobService: JobService;
  private authorService: AuthorService;
  private commentService: CommentService;
  private novelService: NovelService;
  private chapterService: ChapterService;
  private crawlerService: CrawlerService;
  private authService: AuthService;

  private constructor(config: CreateApiConfig) {
    super(config);
    this.userService = new UserService(this.api);
    this.novelCategoryService = new NovelCategoryService(this.api);
    this.recruiterCategoryService = new RecruiterCategoryService(this.api);
    this.roleService = new RoleService(this.api);
    this.permissionService = new PermissionService(this.api);
    this.jobService = new JobService(this.api);
    this.authorService = new AuthorService(this.api);
    this.commentService = new CommentService(this.api);
    this.novelService = new NovelService(this.api);
    this.chapterService = new ChapterService(this.api);
    this.crawlerService = new CrawlerService(this.api);
    this.authService = new AuthService(this.api);
  }

  public static getInstance = (config?: CreateApiConfig) => {
    if (!this.instance) {
      this.instance = new AppcenterSDK(config || { apiEndpoint: "no-api-end-point" })
    }
    return this.instance;
  }

  getUserControl() {
    return {
      ...this.getBaseControl<
        IUserCreation,
        IUserUpdating,
        IUserResponse,
        ISearchQuery<IUserFilter>
      >(this.userService),
    };
  }

  getRoleControl() {
    return {
      ...this.getBaseControl<
        IRoleCreation,
        IRoleUpdating,
        IRoleResponse,
        ISearchQuery<IRoleFilter>
      >(this.roleService),
    };
  }

  getPermissionControl() {
    return {
      ...this.getBaseControl<
        IPermissionCreation,
        IPermissionUpdating,
        IPermissionResponse,
        ISearchQuery<IPermissionFilter>
      >(this.permissionService),
    };
  }

  getRecruiterCategoryControl() {
    return {
      ...this.getBaseControl<
        IRecruiterCategoryCreation,
        IRecruiterCategoryUpdating,
        IRecruiterCategoryResponse,
        ISearchQuery<IRecruiterCategoryFilter>
      >(this.recruiterCategoryService),
    };
  }

  getJobControl() {
    return {
      ...this.getBaseControl<
      IJobCreation,
      IJobUpdating,
      IJobResponse,
      ISearchQuery<IJobFilter>
      >(this.jobService),
    };
  }

  getAuthorControl() {
    return {
      ...this.getBaseControl<
        IAuthorCreation,
        IAuthorUpdating,
        IAuthorResponse,
        ISearchQuery<IAuthorFilter>
      >(this.authorService),
    };
  }

  getNovelsCategoryControl() {
    return {
      ...this.getBaseControl<
        INovelsCategoryCreation,
        INovelsCategoryUpdating,
        INovelsCategoryResponse,
        ISearchQuery<INovelsCategoryFilter>
      >(this.novelCategoryService),
    };
  }

  getNovelControl() {
    return {
      ...this.getBaseControl<
        INovelCreation,
        INovelUpdating,
        INovelResponse,
        ISearchQuery<INovelFilter>
      >(this.novelService),
    };
  }

  getChapterControl() {
    return {
      ...this.getBaseControl<
        IChapterCreation,
        IChapterUpdating,
        IChapterResponse,
        ISearchQuery<IChapterFilter>
      >(this.chapterService),
    };
  }

  getCommentControl() {
    return {
      ...this.getBaseControl<
        ICommentCreation,
        ICommentUpdating,
        ICommentResponse,
        ISearchQuery<ICommentFilter>
      >(this.commentService),
    };
  }

  addAnydatJobData(jobId: string, categoryId: number, htmlString: string) {
    return this.crawlerService.addAnydayJobData(jobId, categoryId, htmlString);
  }

  login(data: ILoginRequest) {
    return this.authService.login(data);
  }

  logout() {
    return this.authService.logout();
  }

  resetPassword(data: IResetPasswordRequest) {
    return this.authService.resetPassword(data);
  }

  register(data: IRegisterRequest) {
    return this.authService.register(data);
  }

  refreshToken() {
    return this.authService.refreshToken();
  }

  validateToken() {
    return this.authService.validateToken();
  }

}

export * from "./types";
export default AppcenterSDK;

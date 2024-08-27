import { BaseSDK, IPagingFilter, IResponse, Pagination as PaginationCore } from "@core-sdk/core";
import {
  AuthService,
  UserService,
  SummaryService,
  TonService,
} from "./services";
import {
  CreateApiConfig,
} from "./types";
import { APIResult } from "@core-ui/api-client";
import { FamousPeopleService } from "./services/FamousPeopleService";
import {
  IFamousPeopleResponse,
  IUserResponse,
  IUserCreation,
  IUserUpdating,
  IUserFilter,
  IAuthResponse,
  IFamousPeopleFilter,
  IBoostCreation,
  IBoostUpdate,
  IBoostResponse,
  BoostType,
  ITonResponse,
} from "@core-ui/goat-tap-types"
import { BoostService } from "./services/BoostService";

export class GoatTapSDK extends BaseSDK {
  private static instance: GoatTapSDK | null = null;
  private userService: UserService;
  private famousPeopleService: FamousPeopleService;
  private authService: AuthService;
  private summaryService: SummaryService;
  private boostService: BoostService;
  private tonService: TonService;


  private constructor(config: CreateApiConfig) {
    super(config);
    this.userService = new UserService(this.api);
    this.famousPeopleService = new FamousPeopleService(this.api);
    this.authService = new AuthService(this.api);
    this.boostService = new BoostService(this.api);
    this.summaryService = new SummaryService(this.api);
    this.tonService = new TonService(this.api);
  }

  public static getInstance = (config?: CreateApiConfig) => {
    if (!this.instance) {
      this.instance = new GoatTapSDK(config || { apiEndpoint: "no-api-end-point" })
    }
    return this.instance;
  }

  getBoostControl() {
    return {
      ...this.getBaseControl<
        IBoostCreation,
        IBoostUpdate,
        IBoostResponse,
        IPagingFilter & any
      >(this.boostService),
    };
  }

  getFamousPeopleControl() {
    return {
      ...this.getBaseControl<
        any,
        any,
        IFamousPeopleResponse,
        IPagingFilter & IFamousPeopleFilter
      >(this.famousPeopleService),
    };
  }

  getUserControl() {
    return {
      ...this.getBaseControl<
        IUserCreation,
        IUserUpdating,
        IUserResponse,
        IUserFilter & IPagingFilter
      >(this.userService),
    };
  }

  getTonControl() {
    return {
      ...this.getBaseControl<
        any,
        any,
        ITonResponse,
        any
      >(this.tonService),
    };
  }

  async checkIsTokenTransfered(packPrice: number) {
    try {
      const rs: APIResult<IResponse<ITonResponse>> = (await this.tonService.checkIsTokenTransfered(packPrice)) as APIResult<IResponse<ITonResponse>>;
      return this.handleApiResult<ITonResponse>(rs);
    } catch (error) {
      console.log("error", error)
      return this.handleErrorResult?.(error);
    }
  }

  async login(telegramId: string | number, referralParams?: string) {
    try {
      const rs: APIResult<IResponse<IAuthResponse>> = await this.authService.login({
        telegramId,
        referralParams
      });
      return this.handleApiResult(rs);
    } catch (error) {
      return this.handleErrorResult?.(error);
    }
  }

  async getAuth() {
    try {
      const rs: APIResult<IResponse<IAuthResponse>> = await this.authService.auth();
      return this.handleApiResult(rs);
    } catch (error) {
      return this.handleErrorResult?.(error);
    }
  }

  async updateRenewEnergyTimes(userId: number, renewEnergyTimes: number) {
    try {
      const rs: APIResult<IResponse<IUserResponse>> = await this.userService.patchUpdate(userId, {
        renewEnergyTimes
      });
      return this.handleApiResult(rs);
    } catch (error) {
      return this.handleErrorResult?.(error);
    }
  }

  async updateEnergy(userId: number, energy: number) {
    try {
      const rs: APIResult<IResponse<IUserResponse>> = await this.userService.updateEnergy(userId, energy);
      return this.handleApiResult(rs);
    } catch (error) {
      return this.handleErrorResult?.(error);
    }
  }

  async updatePoints(userId: number, points: number) {
    try {
      const rs: APIResult<IResponse<IUserResponse>> = await this.userService.updatePoints(userId, points);
      return this.handleApiResult(rs);
    } catch (error) {
      return this.handleErrorResult?.(error);
    }
  }

  async updateGoat(userId: number, goatId: number) {
    try {
      const rs: APIResult<IResponse<IUserResponse>> = await this.userService.patchUpdate(userId, {
        famousPersonId: goatId
      });
      return this.handleApiResult(rs);
    } catch (error) {
      return this.handleErrorResult?.(error);
    }
  }

  async getTapData() {
    try {
      const rs: APIResult<IResponse<any>> = await this.summaryService.getTapData();
      return this.handleApiResult(rs);
    } catch (error) {
      return this.handleErrorResult?.(error);
    }
  }

  async buyBooster(boostType: BoostType) {
    try {
      const rs: APIResult<IResponse<any>> = await this.boostService.buyBooster(boostType);
      return this.handleApiResult(rs);
    } catch (error) {
      return this.handleErrorResult?.(error);
    }
  }
}

export type Pagination<T> = PaginationCore<T>;

export * from "./types";
export default GoatTapSDK;

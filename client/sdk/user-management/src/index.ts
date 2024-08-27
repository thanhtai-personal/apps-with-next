import { BaseSDK, IResponse, Pagination as PaginationCore } from "@core-sdk/core";
import {
  PermissionService,
  RoleService,
  UserService,
} from "./services";
import {
  CreateApiConfig,
  PermissionCreation,
  PermissionFilter,
  PermissionResponse,
  PermissionUpdating,
  RoleCreation,
  RoleFilter,
  RoleResponse,
  RoleUpdating,
  UserCreation,
  UserFilter,
  UserResponse,
  UserUpdating,
  RolesAssigningBody,
  EmailUpdatingBody,
  PasswordUpdatingBody
} from "./types";
import { APIResult } from "@core-ui/api-client";

class UserManagementSDK extends BaseSDK {
  private static instance: UserManagementSDK | null = null;
  private permissionService: PermissionService;
  private userService: UserService;
  private roleService: RoleService;

  private constructor(config: CreateApiConfig) {
    super(config);
    this.permissionService = new PermissionService(this.api);
    this.userService = new UserService(this.api);
    this.roleService = new RoleService(this.api);
  }

  public static getInstance = (config?: CreateApiConfig) => {
    if (!this.instance) {
      this.instance = new UserManagementSDK(config || { apiEndpoint: "no-api-end-point" })
    }
    return this.instance;
  }

  getUserControl() {
    return {
      ...this.getBaseControl<
        UserCreation,
        UserUpdating,
        UserResponse,
        UserFilter
      >(this.userService),
    };
  }

  getRoleControl() {
    return {
      ...this.getBaseControl<
        RoleCreation,
        RoleUpdating,
        RoleResponse,
        RoleFilter
      >(this.roleService),
    };
  }

  getPermissionControl() {
    return {
      ...this.getBaseControl<
        PermissionCreation,
        PermissionUpdating,
        PermissionResponse,
        PermissionFilter
      >(this.permissionService),
    };
  }

  async assignRole(id: string | number, updateData: RolesAssigningBody) {
    try {
      const rs: APIResult<IResponse<UserResponse>> = await this.userService.assignRole(
        id,
        updateData,
      );
      return this.handleApiResult(rs);
    } catch (error) {
      return this.handleErrorResult(error);
    }
  }

  async updateEmail(id: string | number, updateData: EmailUpdatingBody) {
    try {
      const rs: APIResult<IResponse<UserResponse>> = await this.userService.updateEmail(
        id,
        updateData,
      );
      return this.handleApiResult(rs);
    } catch (error) {
      return this.handleErrorResult(error);
    }
  }

  async updatePassword(id: string | number, updateData: PasswordUpdatingBody) {
    try {
      const rs: APIResult<IResponse<UserResponse>> = await this.userService.updatePassword(
        id,
        updateData,
      );
      return this.handleApiResult(rs);
    } catch (error) {
      return this.handleErrorResult(error);
    }
  }
}

export type Pagination<T> = PaginationCore<T>;

export * from "./types";
export default UserManagementSDK;

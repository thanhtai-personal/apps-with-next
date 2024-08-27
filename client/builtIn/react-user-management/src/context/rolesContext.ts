import { PermissionResponse, RoleResponse } from "@core-sdk/user-management";
import { ContextData, makeContext, IAction } from "@core-ui/react-context"

export enum RolesActionType {
  INIT_STATE = "init_state",
  UPDATE_ROLES = "update_roles",
  UPDATE_ROLE = "update_role",
  UPDATE_PERMISSIONS = "update_permissions",
  UPDATE_EDIT_MODE = "update_edit_mode",
}

export interface RolesContext {
  roles?: RoleResponse[];
  role?: RoleResponse;
  permissions?: PermissionResponse[];
  total?: number;
  isEdit?: boolean;
}

type RolesActionPayload = Partial<RolesContext>;

const reducer = (state: RolesContext, action: IAction<RolesActionType, RolesActionPayload>): RolesContext => {

  switch (action.type) {
    case RolesActionType.UPDATE_EDIT_MODE:
      return {
        ...state,
        isEdit: action.payload.isEdit
      };
    case RolesActionType.UPDATE_ROLE:
      return {
        ...state,
        role: action.payload.role
      };
    case RolesActionType.UPDATE_ROLES:
      return {
        ...state,
        roles: action.payload.roles,
        total: action.payload.total
      };
    case RolesActionType.UPDATE_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload.permissions
      };
    case RolesActionType.INIT_STATE:
      return action.payload;
    default:
      return state;
  }
};

export const RolesContext: ContextData<RolesContext, IAction<RolesActionType, RolesActionPayload>> =
  makeContext<RolesContext, IAction<RolesActionType, RolesActionPayload>>(reducer, {}, "role");
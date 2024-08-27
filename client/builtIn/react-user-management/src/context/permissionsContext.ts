import { PermissionResponse } from "@core-sdk/user-management";
import { ContextData, makeContext, IAction } from "@core-ui/react-context"

export enum PermissionsActionType {
  INIT_STATE = "init_state",
  UPDATE_PERMISSIONS = "update_permissions",
  UPDATE_PERMISSION = "update_permission",
  UPDATE_EDIT_MODE = "update_edit_mode",
}

export interface PermissionsContext {
  permissions?: PermissionResponse[],
  permission?: PermissionResponse;
  total?: number;
  isEdit?: boolean;
}

type PermissionsActionPayload = Partial<PermissionsContext>;

const reducer = (state: PermissionsContext, action: IAction<PermissionsActionType, PermissionsActionPayload>): PermissionsContext => {

  switch (action.type) {
    case PermissionsActionType.UPDATE_EDIT_MODE:
      return {
        ...state,
        isEdit: action.payload.isEdit
      };
    case PermissionsActionType.UPDATE_PERMISSION:
      return {
        ...state,
        permission: action.payload.permission
      };
    case PermissionsActionType.UPDATE_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload.permissions,
        total: action.payload.total
      };
    case PermissionsActionType.INIT_STATE:
      return action.payload;
    default:
      return state;
  }
};

export const PermissionsContext: ContextData<PermissionsContext, IAction<PermissionsActionType, PermissionsActionPayload>> =
  makeContext<PermissionsContext, IAction<PermissionsActionType, PermissionsActionPayload>>(reducer, {}, "permission");
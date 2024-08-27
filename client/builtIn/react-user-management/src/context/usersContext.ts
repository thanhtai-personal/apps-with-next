import { RoleResponse, UserResponse } from "@core-sdk/user-management";
import { ContextData, makeContext, IAction } from "@core-ui/react-context"

export enum UsersActionType {
  INIT_STATE = "init_state",
  UPDATE_USERS = "update_users",
  UPDATE_USER = "update_user",
  UPDATE_ROLES = "update_roles",
  UPDATE_EDIT_MODE = "update_edit_mode",
}

export interface UsersContext {
  users?: UserResponse[];
  roles?: RoleResponse[];
  user?: UserResponse;
  total?: number;
  isEdit?: boolean;
}

type UsersActionPayload = Partial<UsersContext>;

const reducer = (state: UsersContext, action: IAction<UsersActionType, UsersActionPayload>): UsersContext => {
  switch (action.type) {
    case UsersActionType.UPDATE_EDIT_MODE:
      return {
        ...state,
        isEdit: action.payload.isEdit
      };
    case UsersActionType.UPDATE_USER:
      return {
        ...state,
        user: action.payload.user,
      }
    case UsersActionType.UPDATE_USERS:
      return {
        ...state,
        users: action.payload.users,
        total: action.payload.total,
      }
    case UsersActionType.UPDATE_ROLES:
      return {
        ...state,
        roles: action.payload.roles,
      }
    case UsersActionType.INIT_STATE:
      return action.payload;
    default:
      return state;
  }
};

export const UsersContext: ContextData<UsersContext, IAction<UsersActionType, UsersActionPayload>> =
  makeContext<UsersContext, IAction<UsersActionType, UsersActionPayload>>(reducer, {
    users: [],
    roles: [],
  }, "user");
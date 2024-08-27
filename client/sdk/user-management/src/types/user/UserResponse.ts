import { RoleResponse } from "../role/RoleResponse";

export interface UserResponse {
  id: number | string;
  email: string;
  firstName?: string;
  lastName?: string;
  status: string;
  roles: RoleResponse[];
}

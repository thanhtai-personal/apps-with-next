import { DbModule } from "@/database";
import { UsersModule } from "./user/users.module";
import { AuthModule } from "./auth/auth.module";
import { RolesModule } from "./role/roles.module";
import { PermissionsModule } from "./permission/permissions.module";

export const allModule = [
  DbModule,
  AuthModule,
  PermissionsModule,
  UsersModule,
  RolesModule,
]
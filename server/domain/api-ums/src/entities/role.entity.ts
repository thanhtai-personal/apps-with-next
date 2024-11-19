import { Entity, OneToMany } from "@core-api/nest-typeorm-postgres";
import { RoleEntity as CoreRoleEntity } from "@core-modules/roles"
import { UserEntity } from "./user.entity";
import { PermissionEntity } from "./permission.entity";

@Entity('roles')
export class RoleEntity extends CoreRoleEntity {
  @OneToMany(() => UserEntity, (user) => user.roleData, { cascade: false })
  users?: UserEntity[];
  
  @OneToMany(() => PermissionEntity, (permission) => permission.role, { cascade: false })
  permissions?: PermissionEntity[];
}
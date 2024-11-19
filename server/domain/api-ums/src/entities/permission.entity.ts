import { Entity, JoinColumn, ManyToOne } from "@core-api/nest-typeorm-postgres";
import { PermissionEntity as CorePermissionEntity } from "@core-modules/permissions"
import { RoleEntity } from "./role.entity";

@Entity('permissions')
export class PermissionEntity extends CorePermissionEntity {
  @ManyToOne(() => RoleEntity, (role) => role.permissions, { cascade: true })
  @JoinColumn({ name: 'roleId' })
  role?: RoleEntity; 
}
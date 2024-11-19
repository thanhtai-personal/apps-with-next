import { RoleEntity } from '@/entities/role.entity';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from "@core-api/nest-core";
import { RolesService as CoreRolesService } from "@core-modules/roles";

const { Injectable } = NEST_COMMON;

@Injectable()
export class RolesService extends CoreRolesService {
  constructor(
    @InjectRepository(RoleEntity)
    protected rolesRepository: Repository<RoleEntity>,
  ) {
    super(rolesRepository)
  }
}
import { PermissionEntity } from '@/entities/permission.entity';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from "@core-api/nest-core";
import { PermissionsService as CorePermissionsService } from "@core-modules/permissions";

const { Injectable } = NEST_COMMON;

@Injectable()
export class PermissionsService extends CorePermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    protected permissionsRepository: Repository<PermissionEntity>,
  ) {
    super(permissionsRepository)
  }
}
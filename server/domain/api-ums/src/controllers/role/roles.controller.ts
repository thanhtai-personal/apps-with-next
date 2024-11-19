

import { RolesService } from '@/services/roles/roles.service';
import { AuthGuard } from '@/guards/auth.guard';
import { RolesController as CoreRolesController } from "@core-modules/roles"
import { NEST_COMMON } from "@core-api/nest-core"

const { Controller, UseGuards } = NEST_COMMON

@Controller("/roles")
@UseGuards(AuthGuard)
export class RolesController extends CoreRolesController {
  constructor(protected readonly roleService: RolesService) {
    super(roleService);
  }
}

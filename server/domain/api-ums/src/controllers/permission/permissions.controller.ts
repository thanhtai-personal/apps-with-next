import { PermissionsService } from '@/services/permissions/permissions.service';
import { AuthGuard } from '@/guards/auth.guard';
import { PermissionsController as CorePermissionsController } from "@core-modules/permissions"
import { NEST_COMMON } from "@core-api/nest-core"

const { Controller, UseGuards } = NEST_COMMON

@Controller("/permissions")
@UseGuards(AuthGuard)
export class PermissionsController extends CorePermissionsController {
  constructor(protected readonly permissionService: PermissionsService) {
    super(permissionService);
  }
}

import { UsersService } from '@/services/users/users.service';
import { AuthGuard } from '@/guards/auth.guard';
import { UsersController as CoreUsersController } from "@core-modules/users"
import { NEST_COMMON } from "@core-api/nest-core"

const { Controller, UseGuards } = NEST_COMMON

@Controller("/users")
@UseGuards(AuthGuard)
export class UsersController extends CoreUsersController {
  constructor(protected readonly userService: UsersService) {
    super(userService);
  }
}

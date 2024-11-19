import { UserEntity } from '@/entities/user.entity';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { NEST_COMMON } from "@core-api/nest-core";
import { UsersService as CoreUsersService } from "@core-modules/users";

const { Injectable } = NEST_COMMON;

@Injectable()
export class UsersService extends CoreUsersService {
  constructor(
    @InjectRepository(UserEntity)
    protected usersRepository: Repository<UserEntity>,
  ) {
    super(usersRepository)
  }
}
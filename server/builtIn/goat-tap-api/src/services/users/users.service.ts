import { useTransactionQuery } from '@/database';
import { searchUser } from "@/database/queries/users.query";
import { CreateUserDto } from '@/dtos/users/user.create.dto';
import { UpdateUserDto } from '@/dtos/users/user.update.dto';
import { FamousPersonEntity } from '@/entities';
import { UserEntity } from '@/entities/user.entity';
import { UserPointsUpdatedEvent } from '@/events/user.event';
import { UserCreateDTOToEntityMapper } from '@/mappers/users/user.create.mapper';
import { UserEntityToUserResponse } from '@/mappers/users/user.response.mapper';
import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { IPagination, IPagingFilter, IUserFilter, IUserResponse } from '@core-ui/goat-tap-types';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(FamousPersonEntity)
    private famousPersonRepository: Repository<FamousPersonEntity>,
    private eventEmitter: EventEmitter2,
  ) { }

  async validate(request: any) {
    const { points } = request.body;
    const { userId } = request.params;

    if (!userId) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersRepository.findOne({
      where: {
        id: Number(userId)
      }
    });
    if (user && user.points !== undefined && user.energy !== undefined && points !== undefined) {
      if (points > user.points && user.energy <= 0) {
        throw new HttpException('Energy must be greater than zero when increasing points', HttpStatus.BAD_REQUEST);
      }
    }
    return request;
  }

  async findAll(filter: IPagingFilter & IUserFilter): Promise<IPagination<IUserResponse>> {
    const queryBuilder = searchUser(this.usersRepository, filter);
    const rawResult = await queryBuilder.getRawMany();
    const [_data, count] = await queryBuilder.getManyAndCount();
    const response: IPagination<IUserResponse> = {
      data: rawResult.map((item) => UserEntityToUserResponse.rawMap(item)),
      total: count,
      limit: filter.limit,
      offset: filter.offset,
    };

    return response;
  }

  async findOne(id: number): Promise<IUserResponse | null> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: id },
        relations: ['famousPerson', 'boosts']
      });
      return user ? UserEntityToUserResponse.map(user) : null;
    } catch (error) {
      // Handle error appropriately
      throw new Error('Error finding user');
    }
  }

  async findByReferralCode(code: string, isEntity: boolean = false): Promise<IUserResponse | UserEntity | null> {
    try {
      const user = await this.usersRepository.findOne({
        where: { referralCode: code },
        relations: ['famousPerson', 'boosts']
      });
      return user ? isEntity ? user : UserEntityToUserResponse.map(user) : null;
    } catch (error) {
      // Handle error appropriately
      throw new Error('Error finding user');
    }
  }

  async findByReferralParams(referralParams: string, isEntity: boolean = false): Promise<IUserResponse | UserEntity | null> {
    try {
      const user = await this.usersRepository.findOne({
        where: { referralParams: referralParams },
        relations: ['famousPerson', 'boosts']
      });
      return user ? isEntity ? user : UserEntityToUserResponse.map(user) : null;
    } catch (error) {
      // Handle error appropriately
      throw new Error('Error finding user');
    }
  }

  async getFamousPeople(famousPersonId: number) {
    const famousPerson = await this.famousPersonRepository.findOneBy({ id: famousPersonId });
    if (!famousPerson) {
      throw new NotFoundException('Famous person not found');
    }
    return famousPerson;
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { id, ...nestedData } = updateUserDto;
    Object.assign(user, nestedData);
    if (updateUserDto.famousPersonId) {
      Object.assign(user, {
        famousPerson: await this.getFamousPeople(updateUserDto.famousPersonId)
      });
    }

    const rsUser = await this.usersRepository.save(user);
    return UserEntityToUserResponse.map(rsUser);
  }

  async patchUpdate(userId: number, updateUserDto: DeepPartial<UpdateUserDto>) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['famousPerson', 'boosts']
    });
    if (!user) {
      throw new Error('User not found');
    }
    const { id, ...nestedData } = updateUserDto;
    Object.assign(user, nestedData);
    if (updateUserDto.famousPersonId) {
      const famousPerson = await this.getFamousPeople(updateUserDto.famousPersonId);
      Object.assign(user, {
        famousPerson
      });
    }

    const rsUser = await this.usersRepository.save(user);
    return UserEntityToUserResponse.map(rsUser);
  }

  async updatePoints(userId: number, points: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['famousPerson', 'boosts']
    });
    if (!user) {
      throw new Error('User not found');
    }
    const oldPoints = user.points;
    if (points < 0 && Math.abs(points) > Number(oldPoints)) {
      throw new Error('Not enough balance!');
    }
    Object.assign(user, {
      points: Number(oldPoints || 0) + points
    });
    if (points > 0 && user.famousPerson) {
      await this.famousPersonRepository.save({
        ...user.famousPerson,
        groupPoints: Number(user.famousPerson?.groupPoints || 0) + points
      })
    }
    const rsUser = await this.usersRepository.save(user);
    return UserEntityToUserResponse.map(rsUser);
  }
  
  async updateEnergy(userId: number, energy: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['famousPerson', 'boosts']
    });
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, {
      energy: Number(user.energy) + energy
    });
    const rsUser = await this.usersRepository.save(user);
    return UserEntityToUserResponse.map(rsUser);
  }

  async findByTelegramId(telegramId: string | number, isEntity?: boolean) {
    try {
      const user = await useTransactionQuery<UserEntity>(UserEntity, 'user', async (manager: any) => {
        return await manager.createQueryBuilder(UserEntity, 'user')
          .leftJoinAndSelect('user.famousPerson', 'famousPerson')
          .leftJoinAndSelect('user.boosts', 'boosts')
          .where(`user.telegramInfo ->> 'telegramId' = :telegramId`, { telegramId: String(telegramId) })
          .getOne();
      });
      return isEntity ? user : user ? UserEntityToUserResponse.map(user) : null;
    } catch (error: any) {
      return {
        error,
        exception: new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR),
      };
    }
  }

  async add(requestedUser: CreateUserDto, isEntity: boolean = false) {
    try {
      const famousPerson = await this.famousPersonRepository.findOneBy({ id: requestedUser.famousPersonId });
      const user = this.usersRepository.create(UserCreateDTOToEntityMapper.map(requestedUser, {
        famousPerson
      }));
      await this.usersRepository.save(user);
      return isEntity ? user : UserEntityToUserResponse.map(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error: any) {
      // throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
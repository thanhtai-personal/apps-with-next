import { FamousPersonEntity, UserEntity } from '@/entities';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { IUserResponse } from '@core-ui/goat-tap-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(FamousPersonEntity)
    private famousPersonRepository: Repository<FamousPersonEntity>,
  ) { }

  async getTapData(authUser: IUserResponse): Promise<any> {
    if (!authUser) {
      return null;
    }
    try {
      const currentUserData = await this.usersRepository.findOne({
        where: { id: authUser.id },
        relations: ['famousPerson', 'boosts']
      })
      if (!currentUserData) {
        return null;
      }
      const famousPersonId = currentUserData.famousPerson?.id;

      const famousPerson = await this.famousPersonRepository.findOne({
        where: { id: famousPersonId }
      })

      return {
        groupPoints: Number(famousPerson?.groupPoints),
        famousPerson,
      };
    } catch (error: any) {
      console.error('Error in getTapData:', error.message);
      // throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

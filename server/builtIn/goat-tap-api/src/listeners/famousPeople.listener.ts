// listeners/user-listener.ts
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { FamousPersonEntity } from '@/entities/famousPerson.entity';
import { UserPointsUpdatedEvent } from '@/events/user.event';

@Injectable()
export class FamousPeopleListener {
  constructor(
    @InjectRepository(FamousPersonEntity)
    private famousPersonRepository: Repository<FamousPersonEntity>,
  ) { }

  // @OnEvent('user.points.updated')
  // async handleUserPointsUpdated(event: UserPointsUpdatedEvent) {
  //   const person = await this.famousPersonRepository.findOne({ relations: ['users'], where: { id: event.famousPersonId } });

  //   if (person && person.users) {
  //     Object.assign(person, {
  //       groupPoints: (person.users || []).reduce((sum, user) => sum + (Number(user.points || 0)), 0)
  //     })

  //     await this.famousPersonRepository.save(person);
  //   }
  // }
}

import { FamousPersonEntity, UserEntity } from '@/entities';
import { InjectRepository, LessThan, MoreThan, Repository } from '@core-api/nest-typeorm-postgres';
import { BoostType } from "@core-ui/goat-tap-types";
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TonApiService } from "../ton/ton.service";

const MAX_ENERGY = 2500;

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(FamousPersonEntity)
    private famousPersonRepo: Repository<FamousPersonEntity>,
    private tonService: TonApiService,
  ) { }

  // @Cron("0 */2 * * * *") //2 mins
  @Cron(CronExpression.EVERY_5_SECONDS)
  syncTransactions() {
    this.tonService.syncTransaction(true);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  updateEveryNight() {
    this.updateField();
  }

  async updateField() {
    // Reset energy
    return await this.userRepo.createQueryBuilder()
      .update(UserEntity)
      .set({ renewEnergyTimes: 3 })
      .execute();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  updateEnergyPerSecond() {
    this.updateEnergy();
  }

  async updateEnergy() {
    const users = await this.userRepo.find({
      where: {
        energy: LessThan(MAX_ENERGY),
      },
    });

    for (const user of users) {
      user.energy = Math.min((user.energy || 0) + 1, MAX_ENERGY);
      await this.userRepo.save(user);
    }

  }

  @Cron(CronExpression.EVERY_SECOND)
  execAutoBot() {
    this.autoBoostByBot();
  }

  async autoBoostByBot() {
    const users = await this.userRepo.find({
      where: {
        energy: MoreThan(0),
        boosts: {
          type: BoostType.AutoBoot,
          // expiredAt: MoreThan(new Date()),
        },
      },
      relations: ['boosts', 'famousPerson'],
    });

    // Increment points for each user
    for (const user of users) {
      const autoBoost = user.boosts?.find((boost) => boost.type === BoostType.AutoBoot)
      if (!autoBoost || !autoBoost.expiredAt || new Date(autoBoost.expiredAt as any) <= new Date()) {
        // hot fix prevent running of expired bot
        continue;
      }
      if (user.id) {
        if (user?.famousPerson?.id) {
          const famousPerson = await this.famousPersonRepo.findOne({
            where: {
              id: user.famousPerson.id
            }
          });
          if (famousPerson) {
            await this.famousPersonRepo.save({
              ...famousPerson,
              groupPoints: Number(famousPerson.groupPoints) + 1
            })
          }
        }
        user.points = Number(user.points) + 1;
        user.energy = Number(user.energy) - 1;
        await this.userRepo.save(user);
      }
    }
  }

}
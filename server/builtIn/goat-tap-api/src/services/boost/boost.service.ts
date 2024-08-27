import { calculateNewPrice, calculateNewXP, tonPriceConfig } from "@/config";
import { BuyBoostDto } from '@/dtos/boost/boost.buy.dto';
import { BoostUpdateDto } from '@/dtos/boost/boost.update.dto';
import { BoostEntity, UserEntity } from '@/entities';
import { BoostCreationToBoostEntityMapper } from '@/mappers/boost/boost.create.mapper';
import { BoostEntityToBoostResponseMapper } from '@/mappers/boost/boost.response.mapper';
import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { BoostType, IBoostCreation, IUserResponse } from '@core-ui/goat-tap-types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { addHours } from 'date-fns';

@Injectable()
export class BoostService {
  constructor(
    @InjectRepository(BoostEntity)
    private boostRepository: Repository<BoostEntity>,
    @InjectRepository(UserEntity)
    private userRespo: Repository<UserEntity>,
  ) { }

  getTapPointsPerLevel(boostType: BoostType) {
    switch (boostType) {
      case BoostType.SuperCharge:
        return 2;
      case BoostType.MegaCharge:
        return 5;
      default:
        return 1;
    }
  }

  async buy(auth: IUserResponse, { boostType }: BuyBoostDto) {
    try {
      console.log("Received buy request", boostType)
      const user = await this.userRespo.findOne({
        where: { id: auth.id },
        relations: ['boosts']
      });
      if (!user) {
        throw new HttpException("User not found!", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const boosts = user!.boosts || [];
      const boost = boosts.find(b => b.type === boostType) || {
        level: 1,
        type: boostType,
        userId: user!.id,
        expiredAt: new Date(),
      } as IBoostCreation;
      if (Number(user.points!) < Number(boost.goatPrice)) {
        throw new HttpException("Not enough balance!", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      if (boostType === BoostType.AutoBoot) {
        boost.goatPrice = 0;
        boost.tonPrice = Number(tonPriceConfig[BoostType.AutoBoot]);
        if (boost.expiredAt && new Date(boost.expiredAt) > new Date()) {
          boost.expiredAt = new Date(addHours(new Date(boost.expiredAt!), tonPriceConfig.autoBoostValue));
        } else {
          boost.expiredAt = new Date(addHours(new Date(), tonPriceConfig.autoBoostValue));
        }
        
      } else {
        boost.level = boost.level + 1;
        user.points = Number(user.points!) - Number(boost.goatPrice)
        boost.goatPrice = calculateNewPrice(boostType, boost.level) || 0;
        boost.pointsPerTap = Number(boost.nextLevelPointsPerTap) || calculateNewXP(boostType, boost.level) || 1;
        boost.nextLevelPointsPerTap = calculateNewXP(boostType, boost.level + 1) || 1;
        user.energy = 0;
      }
      await this.userRespo.save(user);
      const rsBoot = await this.boostRepository.save(BoostCreationToBoostEntityMapper.map(boost, { user }));
      return BoostEntityToBoostResponseMapper.map(rsBoot);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: IBoostCreation, user: UserEntity) {
    return await this.boostRepository.save(BoostCreationToBoostEntityMapper.map(data, { user }));
  }


  async patchUpdate(boostId: number, updateBoostDto: DeepPartial<BoostUpdateDto>) {
    const boost = await this.boostRepository.findOne({
      where: { id: boostId },
      relations: ['famousPerson', 'boosts']
    });
    if (!boost) {
      throw new Error('Boost not found');
    }
    const { id, ...nestedData } = updateBoostDto;
    Object.assign(boost, nestedData);
    const rsBoost = await this.boostRepository.save(boost);
    return BoostEntityToBoostResponseMapper.map(rsBoost);
  }
}
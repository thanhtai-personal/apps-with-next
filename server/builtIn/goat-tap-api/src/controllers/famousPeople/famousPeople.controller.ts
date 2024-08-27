import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Query, Res } from '@nestjs/common';
import { FamousPersonService } from '@/services/famousPerson/famousPerson.service';
import { Response } from "express"
import { IFamousPeopleFilter, IFamousPeopleResponse, IPagination, IPagingFilter } from '@core-ui/goat-tap-types';
import { UpdateFamousPersonDto } from '@/dtos/famousPeople/famousPeople.update.dto';

@Controller("/famous-people")
export class FamousPeopleController {
  constructor(private readonly service: FamousPersonService) { }

  @Get()
  async getMany(
    @Query() query: IPagingFilter & IFamousPeopleFilter,
    @Res()
    res: Response
  ) {
    try {
      const cachedDataJson: any = await this.service.getCachedData("famousPeople");
      const cachedData = cachedDataJson ? JSON.parse(cachedDataJson) : null;
      if (cachedData && cachedData.nextUpdateTime > Date.now()) {
        return res.status(HttpStatus.OK).send({
          total: cachedData.length,
          offset: 0,
          limit: 1000,
          data: cachedData.data
        } as IPagination<IFamousPeopleResponse>)
      }
      const data: IPagination<IFamousPeopleResponse> = await this.service.findAll({
        limit: query.limit || 10,
        offset: query.offset || 0,
        name: query.name ? query.name : undefined
      });
      return res.status(HttpStatus.OK).send(data)
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("/:id")
  async patchUpdate(
    @Param('id')
    id: string | number,
    @Body()
    patchUpdateDto: Partial<UpdateFamousPersonDto>,
    @Res()
    res: Response
  ) {
    try {
      const famousPerson = await this.service.patchUpdate(Number(id), patchUpdateDto);
      return res.status(HttpStatus.OK).send(famousPerson);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

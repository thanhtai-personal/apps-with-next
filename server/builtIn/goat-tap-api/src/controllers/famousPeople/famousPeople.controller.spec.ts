import { Test, TestingModule } from '@nestjs/testing';
import { FamousPeopleController } from './famousPeople.controller';

describe('famousPeopleController', () => {
  let controller: FamousPeopleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamousPeopleController],
    }).compile();

    controller = module.get<FamousPeopleController>(FamousPeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

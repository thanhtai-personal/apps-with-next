import * as request from 'supertest';
import { AppModule } from '../src/modules/app/app.module';
import { NEST_COMMON, NEST_TESTING } from "@core-api/nest-core";

const { Test } = NEST_TESTING

describe('AppController (e2e)', () => {
  let app: NEST_COMMON.INestApplication;

  beforeEach(async () => {
    const moduleFixture: NEST_TESTING.TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

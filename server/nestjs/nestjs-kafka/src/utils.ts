import { NEST_MICRO_SERVICE, NEST_CORE, NEST_COMMON } from "@core-api/nest-core"


type IKafkaOptions = any & NEST_MICRO_SERVICE.MicroserviceOptions;
// NestApplicationContextOptions & NEST_MICRO_SERVICE.MicroserviceOptions

export const createKafkaService = async (AppModule: any, options: IKafkaOptions) => {
  const app = await NEST_CORE.NestFactory.createMicroservice<NEST_MICRO_SERVICE.MicroserviceOptions>(AppModule, {
    transport: NEST_MICRO_SERVICE.Transport.KAFKA,
    options: {
      run: {
        autoCommit: false
      },
      ...(options || {})
    }
  });
  return app;
}
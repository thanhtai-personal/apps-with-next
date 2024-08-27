import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import { AppExceptionsFilter, ExceptionInterceptor } from './decorators/exceptions';
import { EnvironmentConfig } from './config';
// import * as fs from 'fs';
// import * as path from 'path';
// import { HTTPSConfig } from './config';

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync(path.resolve(__dirname, HTTPSConfig.PRIVATE_KEY_PATH || '../private-key.pem')),
  //   cert: fs.readFileSync(path.resolve(__dirname, HTTPSConfig.CERTIFICATE_PATH || '../certificate.pem')),
  //   passphrase: HTTPSConfig.PRIVATE_KEY_PASSPHRASE,
  // };
  // const app = await NestFactory.create(AppModule, { httpsOptions, cors: true });
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new AppExceptionsFilter());
  app.useGlobalInterceptors(new ExceptionInterceptor(new Reflector()));
  const config = new DocumentBuilder()
    .setTitle('Goat tap API')
    .setDescription('Goat Tap API description')
    .setVersion('1.0')
    .addTag('goatTap')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(EnvironmentConfig.PORT);
}
bootstrap();

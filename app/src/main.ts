import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { RootConfig } from './config/config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const config = app.get(RootConfig);
  logger.log('Bootstraping application...', {
    service: config.service,
    port: config.port,
  });
  await app.listen(config.port);
}

void bootstrap();

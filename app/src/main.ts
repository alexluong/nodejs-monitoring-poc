import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { RootConfig, rootConfig } from './config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  logger.log('Bootstraping application...', {
    service: rootConfig.service,
  });
  const app = await NestFactory.create(AppModule);
  const config = app.get(RootConfig);
  await app.listen(config.port);
}

void bootstrap();

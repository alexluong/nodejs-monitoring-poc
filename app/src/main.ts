import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RootConfig, rootConfig } from './config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  logger.log('Bootstraping application...', {
    service: rootConfig.service,
  });
  const app = await NestFactory.create(AppModule);
  const config = app.get(RootConfig);

  app.useGlobalPipes(new ValidationPipe());

  // NOTE: need to connectMicroservice AFTER the pipes and other configs
  // for "inheritAppConfig" to work as expected
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: [config.nats],
      },
    },
    {
      inheritAppConfig: true,
    },
  );
  await app.startAllMicroservices();
  await app.listen(config.port);
}

void bootstrap();

import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ApiController } from './api.controller';
import { RootConfig } from '../config';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [
    {
      provide: 'NATS_CLIENT',
      useFactory: (config: RootConfig) => {
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [config.nats],
          },
        });
      },
      inject: [RootConfig],
    },
  ],
})
export class ApiModule {}

import { Module, ModuleMetadata } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, RootConfig, rootConfig } from './config';
import { ApiModule } from './api';
import { NotificationModule } from './notification';
import { MongooseModule } from '@nestjs/mongoose';

const moduleMap: Record<string, Required<ModuleMetadata>['imports'][number]> = {
  api: ApiModule,
  notification: NotificationModule,
};

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      useFactory: (rootConfig: RootConfig) => {
        return {
          uri: rootConfig.mongodb,
        };
      },
      inject: [RootConfig],
    }),
    ...(moduleMap[rootConfig.service] ? [moduleMap[rootConfig.service]] : []),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

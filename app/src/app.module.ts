import { Module, ModuleMetadata } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, rootConfig } from './config';
import { ApiModule } from './api';
import { NotificationModule } from './notification';

const moduleMap: Record<string, Required<ModuleMetadata>['imports'][number]> = {
  api: ApiModule,
  notification: NotificationModule,
};

@Module({
  imports: [
    ConfigModule,
    ...(moduleMap[rootConfig.service] ? [moduleMap[rootConfig.service]] : []),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

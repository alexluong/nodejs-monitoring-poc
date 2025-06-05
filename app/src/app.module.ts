import { Module, ModuleMetadata } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenTelemetryModule } from 'nestjs-otel';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, RootConfig, rootConfig } from './config';
import { ApiModule } from './api';
import { NotificationModule } from './notification';

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
    OpenTelemetryModule.forRoot({
      metrics: {
        hostMetrics: true,
        apiMetrics: {
          enable: true,
          defaultAttributes: {},
          ignoreUndefinedRoutes: true,
        },
      },
    }),
    ...(moduleMap[rootConfig.service] ? [moduleMap[rootConfig.service]] : []),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

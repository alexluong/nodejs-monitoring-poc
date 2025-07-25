import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './notification.controller';
import {
  Notification,
  NotificationSchema,
} from '../schemas/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [],
})
export class NotificationModule {}

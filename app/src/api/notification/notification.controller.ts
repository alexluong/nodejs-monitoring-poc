import {
  Controller,
  Post,
  Get,
  Body,
  Inject,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Types } from 'mongoose';
import {
  TriggerNotificationDto,
  NotificationMessageDto,
} from '../../dtos/notification';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private readonly notificationService: NotificationService,
  ) {}

  @Post('trigger')
  @HttpCode(HttpStatus.ACCEPTED)
  triggerNotification(@Body() triggerNotificationDto: TriggerNotificationDto) {
    const id = new Types.ObjectId().toString();

    const message: NotificationMessageDto = {
      id,
      ...triggerNotificationDto,
    };

    this.natsClient.emit('notification.trigger', message);

    return { id };
  }

  @Get()
  getAllNotifications() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  getNotificationById(@Param('id') id: string) {
    return this.notificationService.findById(id);
  }
}

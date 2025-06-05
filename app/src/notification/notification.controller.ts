import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EchoEventDto } from '../dtos/echo';
import { PingRequestDto, PingResponseDto } from '../dtos/ping';
import { NotificationMessageDto } from '../dtos/notification';
import {
  Notification,
  NotificationDocument,
} from '../schemas/notification.schema';

@Controller('notification')
export class NotificationController {
  private logger = new Logger('NotificationController');

  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  @Get('hello')
  getHello() {
    return {
      message: 'Hello from Notification!',
    };
  }

  @EventPattern('echo')
  echo(@Payload() data: EchoEventDto) {
    this.logger.log('echo', data);
  }

  @MessagePattern('ping')
  handlePing(data: PingRequestDto): PingResponseDto {
    return new PingResponseDto({
      message: 'pong',
      receivedAt: data.timestamp,
      respondedAt: new Date(),
    });
  }

  @EventPattern('notification.trigger')
  async handleSendNotification(@Payload() message: NotificationMessageDto) {
    // Mock notification sending - just log for now
    this.logger.log(
      `Mock: Sending notification with template ${message.templateId}`,
      message.data,
    );

    // Save notification to MongoDB with the provided ID
    const notification = new this.notificationModel({
      _id: message.id,
      templateId: message.templateId,
      data: message.data,
      sentAt: new Date(),
    });

    await notification.save();
    this.logger.log('Notification saved to database', { id: message.id });
  }
}

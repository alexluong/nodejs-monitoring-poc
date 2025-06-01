import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { EchoEventDto } from '../dtos/echo';
import { PingRequestDto, PingResponseDto } from '../dtos/ping';

@Controller('notification')
export class NotificationController {
  constructor() {}

  private logger = new Logger('NotificationController');

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
}

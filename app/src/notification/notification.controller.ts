import { Controller, Get } from '@nestjs/common';

@Controller('notification')
export class NotificationController {
  constructor() {}

  @Get('hello')
  getHello() {
    return {
      message: 'Hello from Notification!',
    };
  }
}

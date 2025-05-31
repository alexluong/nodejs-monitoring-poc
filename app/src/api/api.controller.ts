import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  constructor() {}

  @Get('hello')
  getHello() {
    return {
      message: 'Hello from API!',
    };
  }
}

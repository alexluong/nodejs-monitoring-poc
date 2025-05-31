import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RootConfig } from './config/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('config')
  getConfig(): RootConfig {
    return this.appService.getConfig();
  }
}

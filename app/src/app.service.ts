import { Injectable } from '@nestjs/common';
import { RootConfig } from './config/config';

@Injectable()
export class AppService {
  constructor(private config: RootConfig) {}

  getHello(): string {
    return 'Hello World!';
  }

  getConfig(): RootConfig {
    return this.config;
  }
}

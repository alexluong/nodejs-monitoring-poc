import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { EchoBodyDto, EchoEventDto } from '../dtos/echo';
import { PingRequestDto, PingResponseDto } from '../dtos/ping';
import { validateResponse } from '../utils/validator';

@Controller('api')
export class ApiController {
  constructor(
    @Inject('NATS_CLIENT') private readonly natsClient: ClientProxy,
  ) {}

  @Get('hello')
  getHello() {
    return {
      message: 'Hello from API!',
    };
  }

  @Post('echo')
  echo(@Body() body: EchoBodyDto) {
    this.natsClient.emit(
      'echo',
      new EchoEventDto({
        message: body.message,
        sentAt: new Date(),
      }),
    );
    return { status: 'emitted' };
  }

  @Get('ping')
  async ping() {
    const response = await firstValueFrom(
      this.natsClient
        .send('ping', new PingRequestDto())
        .pipe(validateResponse(PingResponseDto)),
    );
    return response;
  }
}

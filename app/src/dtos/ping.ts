import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class PingRequestDto {
  @IsDate()
  @Type(() => Date)
  timestamp: Date;

  constructor() {
    this.timestamp = new Date();
  }
}

export class PingResponseDto {
  @IsString()
  message: string;

  @IsDate()
  @Type(() => Date)
  receivedAt: Date;

  @IsDate()
  @Type(() => Date)
  respondedAt: Date;

  constructor(data: PingResponseDto) {
    Object.assign(this, data);
  }
}

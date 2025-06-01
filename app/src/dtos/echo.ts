import { Type } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';

export class EchoBodyDto {
  @IsString()
  message: string;
}

export class EchoEventDto {
  @IsString()
  message: string;

  @IsDate()
  @Type(() => Date)
  sentAt: Date;

  constructor(data: EchoEventDto) {
    Object.assign(this, data);
  }
}

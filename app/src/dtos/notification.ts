import { IsString, IsObject, IsNotEmpty } from 'class-validator';

export class TriggerNotificationDto {
  @IsString()
  @IsNotEmpty()
  templateId: string;

  @IsObject()
  @IsNotEmpty()
  data: Record<string, any>;
}

export class NotificationMessageDto extends TriggerNotificationDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

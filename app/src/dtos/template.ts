import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  template: string;
}

export class UpdateTemplateDto {
  @IsString()
  @IsNotEmpty()
  template: string;
}

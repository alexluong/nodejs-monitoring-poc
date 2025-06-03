import { IsNotEmpty, IsPort, IsString } from 'class-validator';

export class RootConfig {
  @IsString()
  @IsNotEmpty()
  public readonly service!: string;

  @IsPort()
  public readonly port!: string;

  @IsString()
  @IsNotEmpty()
  public readonly nats!: string;

  @IsString()
  @IsNotEmpty()
  public readonly mongodb!: string;
}

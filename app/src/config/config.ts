import { IsNotEmpty, IsPort, IsString } from 'class-validator';

export class RootConfig {
  @IsString()
  @IsNotEmpty()
  public readonly service!: string;

  @IsPort()
  public readonly port!: string;
}

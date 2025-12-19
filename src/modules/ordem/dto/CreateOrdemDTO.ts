import { IsInt, IsPositive, IsString, Min } from 'class-validator';

export class CreateOrdemDTO {
  @IsString()
  service: string;

  @IsString()
  link: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  quantity: number;

  @IsString()
  comprador: string;

  @IsString()
  username: string;
}

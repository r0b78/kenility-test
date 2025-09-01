import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsArray()
  products?: string[];
}

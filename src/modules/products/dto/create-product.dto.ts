import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  sku: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;
}

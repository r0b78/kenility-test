import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  clientName: string;

  @IsArray()
  @ArrayNotEmpty()
  products: string[];
}

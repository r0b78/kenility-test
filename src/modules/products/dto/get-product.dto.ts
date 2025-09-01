import { IsMongoId } from 'class-validator';

export class GetProductDto {
  @IsMongoId()
  id: string;
}

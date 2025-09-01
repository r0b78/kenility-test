import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTotalByDaysDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  days: number;
}

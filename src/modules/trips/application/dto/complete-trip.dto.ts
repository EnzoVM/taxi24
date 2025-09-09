import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CompleteTripDto {
  @Type(() => Number)
  @IsInt({ message: 'tripId debe ser un número entero' })
  @Min(1, { message: 'tripId debe ser mayor que 0' })
  tripId: number;
}

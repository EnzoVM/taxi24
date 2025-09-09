import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetRiderByIdDto {
  @Type(() => Number)
  @IsInt({ message: 'riderId debe ser un número entero' })
  @Min(1, { message: 'riderId debe ser mayor que 0' })
  riderId: number;
}

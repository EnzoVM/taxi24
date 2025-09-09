import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetDriverByIdDto {
  @Type(() => Number)
  @IsInt({ message: 'driverId debe ser un número entero' })
  @Min(1, { message: 'driverId debe ser mayor que 0' })
  driverId: number;
}

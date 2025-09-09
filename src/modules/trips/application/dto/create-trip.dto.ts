import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateTripDto {
  @IsInt()
  @IsPositive()
  driverId: number;

  @IsInt()
  @IsPositive()
  riderId: number;

  @IsNumber({}, { message: 'startLatitude debe ser numérico' })
  startLatitude: number;

  @IsNumber({}, { message: 'startLongitude debe ser numérico' })
  startLongitude: number;

  @IsNumber({}, { message: 'endLatitude debe ser numérico' })
  endLatitude: number;

  @IsNumber({}, { message: 'endLongitude debe ser numérico' })
  endLongitude: number;
}

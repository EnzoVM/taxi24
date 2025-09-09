import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAvailableDriversByRadiusDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'latitude debe ser numérico' })
  latitude: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'longitude debe ser numérico' })
  longitude: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'radius debe ser numérico' })
  @Min(1, { message: 'radius debe ser mayor que 0' })
  radius: number;
}

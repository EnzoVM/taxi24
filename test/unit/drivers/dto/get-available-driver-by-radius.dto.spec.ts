/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'reflect-metadata';
import { validate } from 'class-validator';
import { GetAvailableDriversByRadiusDto } from '../../../../src/modules/drivers/application/dto/get-available-driver-by-radius.dto';

describe('GetAvailableDriversByRadiusDto', () => {
  it('valida correctamente los datos válidos', async () => {
    const dto = new GetAvailableDriversByRadiusDto();
    dto.latitude = -12.05;
    dto.longitude = -77.03;
    dto.radius = 5;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('falla si latitude no es numérico', async () => {
    const dto = new GetAvailableDriversByRadiusDto();
    // @ts-expect-error
    dto.latitude = 'abc';
    dto.longitude = -77.03;
    dto.radius = 5;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'latitude')).toBe(true);
  });

  it('falla si longitude no es numérico', async () => {
    const dto = new GetAvailableDriversByRadiusDto();
    dto.latitude = -12.05;
    // @ts-expect-error
    dto.longitude = 'abc';
    dto.radius = 5;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'longitude')).toBe(true);
  });

  it('falla si radius no es numérico', async () => {
    const dto = new GetAvailableDriversByRadiusDto();
    dto.latitude = -12.05;
    dto.longitude = -77.03;
    // @ts-expect-error
    dto.radius = 'abc';
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'radius')).toBe(true);
  });

  it('falla si radius es menor que 1', async () => {
    const dto = new GetAvailableDriversByRadiusDto();
    dto.latitude = -12.05;
    dto.longitude = -77.03;
    dto.radius = 0;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'radius')).toBe(true);
  });
});

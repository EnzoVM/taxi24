/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'reflect-metadata';
import { validate } from 'class-validator';
import { GetNearestDriversDto } from '../../../../src/modules/riders/application/dto/get-nearest-drivers.dto';

describe('GetNearestDriversDto', () => {
  it('valida correctamente un riderId válido', async () => {
    const dto = new GetNearestDriversDto();
    dto.riderId = 10;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('falla si riderId no es entero', async () => {
    const dto = new GetNearestDriversDto();

    dto.riderId = 3.14;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });

  it('falla si riderId es menor que 1', async () => {
    const dto = new GetNearestDriversDto();
    dto.riderId = 0;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('falla si riderId no es numérico', async () => {
    const dto = new GetNearestDriversDto();

    // @ts-expect-error
    dto.riderId = 'abc';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });
});

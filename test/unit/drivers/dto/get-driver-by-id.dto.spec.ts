/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'reflect-metadata';
import { validate } from 'class-validator';
import { GetDriverByIdDto } from '../../../../src/modules/drivers/application/dto/get-driver-by-id.dto';

describe('GetDriverByIdDto', () => {
  it('valida correctamente un driverId válido', async () => {
    const dto = new GetDriverByIdDto();
    dto.driverId = 5;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('falla si driverId no es entero', async () => {
    const dto = new GetDriverByIdDto();

    dto.driverId = 3.14;
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });

  it('falla si driverId es menor que 1', async () => {
    const dto = new GetDriverByIdDto();
    dto.driverId = 0;
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('falla si driverId no es numérico', async () => {
    const dto = new GetDriverByIdDto();

    // @ts-expect-error
    dto.driverId = 'abc';
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });
});

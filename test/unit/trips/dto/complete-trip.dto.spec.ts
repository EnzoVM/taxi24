/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'reflect-metadata';
import { validate } from 'class-validator';
import { CompleteTripDto } from '../../../../src/modules/trips/application/dto/complete-trip.dto';

describe('CompleteTripDto', () => {
  it('valida correctamente un tripId válido', async () => {
    const dto = new CompleteTripDto();
    dto.tripId = 10;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('falla si tripId no es entero', async () => {
    const dto = new CompleteTripDto();

    dto.tripId = 3.14;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });

  it('falla si tripId es menor que 1', async () => {
    const dto = new CompleteTripDto();
    dto.tripId = 0;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('falla si tripId no es numérico', async () => {
    const dto = new CompleteTripDto();

    // @ts-expect-error
    dto.tripId = 'abc';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });
});

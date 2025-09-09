/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreateTripDto } from '../../../../src/modules/trips/application/dto/create-trip.dto';

describe('CreateTripDto', () => {
  it('valida correctamente un trip válido', async () => {
    const dto = new CreateTripDto();
    dto.driverId = 1;
    dto.riderId = 2;
    dto.startLatitude = -12.05;
    dto.startLongitude = -77.03;
    dto.endLatitude = -12.06;
    dto.endLongitude = -77.04;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('falla si driverId no es entero positivo', async () => {
    const dto = new CreateTripDto();
    dto.driverId = -1;
    dto.riderId = 2;
    dto.startLatitude = -12.05;
    dto.startLongitude = -77.03;
    dto.endLatitude = -12.06;
    dto.endLongitude = -77.04;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'driverId')).toBe(true);
  });

  it('falla si riderId no es entero positivo', async () => {
    const dto = new CreateTripDto();
    dto.driverId = 1;
    dto.riderId = 0;
    dto.startLatitude = -12.05;
    dto.startLongitude = -77.03;
    dto.endLatitude = -12.06;
    dto.endLongitude = -77.04;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'riderId')).toBe(true);
  });

  it('falla si startLatitude no es numérico', async () => {
    const dto = new CreateTripDto();
    dto.driverId = 1;
    dto.riderId = 2;

    // @ts-expect-error
    dto.startLatitude = 'abc';
    dto.startLongitude = -77.03;
    dto.endLatitude = -12.06;
    dto.endLongitude = -77.04;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'startLatitude')).toBe(true);
  });

  it('falla si startLongitude no es numérico', async () => {
    const dto = new CreateTripDto();
    dto.driverId = 1;
    dto.riderId = 2;
    dto.startLatitude = -12.05;

    // @ts-expect-error
    dto.startLongitude = 'abc';
    dto.endLatitude = -12.06;
    dto.endLongitude = -77.04;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'startLongitude')).toBe(true);
  });

  it('falla si endLatitude no es numérico', async () => {
    const dto = new CreateTripDto();
    dto.driverId = 1;
    dto.riderId = 2;
    dto.startLatitude = -12.05;
    dto.startLongitude = -77.03;

    // @ts-expect-error
    dto.endLatitude = 'abc';
    dto.endLongitude = -77.04;
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'endLatitude')).toBe(true);
  });

  it('falla si endLongitude no es numérico', async () => {
    const dto = new CreateTripDto();
    dto.driverId = 1;
    dto.riderId = 2;
    dto.startLatitude = -12.05;
    dto.startLongitude = -77.03;
    dto.endLatitude = -12.06;

    // @ts-expect-error
    dto.endLongitude = 'abc';
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'endLongitude')).toBe(true);
  });
});

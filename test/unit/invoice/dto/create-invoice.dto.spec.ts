/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreateInvoiceDto } from '../../../../src/modules/invoice/application/dto/create-invoice.dto';
import { CURRENCIES } from '../../../../src/modules/shared/constants/app.constants';

describe('CreateInvoiceDto', () => {
  it('valida correctamente un invoice válido', async () => {
    const dto = new CreateInvoiceDto();
    dto.tripId = 1;
    dto.amount = 100.25;
    dto.currency = CURRENCIES[0];
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('falla si tripId no es entero positivo', async () => {
    const dto = new CreateInvoiceDto();
    dto.tripId = -1;
    dto.amount = 100.25;
    dto.currency = CURRENCIES[0];
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'tripId')).toBe(true);
  });

  it('falla si amount no es positivo', async () => {
    const dto = new CreateInvoiceDto();
    dto.tripId = 1;
    dto.amount = -10;
    dto.currency = CURRENCIES[0];
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'amount')).toBe(true);
  });

  it('falla si amount tiene más de 2 decimales', async () => {
    const dto = new CreateInvoiceDto();
    dto.tripId = 1;
    dto.amount = 10.123;
    dto.currency = CURRENCIES[0];
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'amount')).toBe(true);
  });

  it('falla si currency no está en la lista permitida', async () => {
    const dto = new CreateInvoiceDto();
    dto.tripId = 1;
    dto.amount = 100.25;
    dto.currency = 'INVALID';
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'currency')).toBe(true);
  });
});

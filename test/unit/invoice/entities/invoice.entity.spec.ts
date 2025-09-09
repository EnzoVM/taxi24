import { Invoice } from '../../../../src/modules/invoice/domain/entities/invoice.entity';
import { Trip } from '../../../../src/modules/trips/domain/entities/trip.entity';

describe('Invoice Entity', () => {
  it('should create an Invoice instance with correct values', () => {
    const trip: Trip = { tripId: 1 } as Trip;
    const invoice = new Invoice();
    invoice.invoiceId = 1;
    invoice.tripId = 1;
    invoice.trip = trip;
    invoice.amount = 50;
    invoice.currency = 'PEN';
    invoice.isActive = true;
    invoice.createdBy = 'SYSTEM';
    invoice.createdAt = new Date('2023-01-01T00:00:00Z');
    invoice.updatedBy = null;
    invoice.updatedAt = null;

    expect(invoice.invoiceId).toBe(1);
    expect(invoice.tripId).toBe(1);
    expect(invoice.trip).toBe(trip);
    expect(invoice.amount).toBe(50);
    expect(invoice.currency).toBe('PEN');
    expect(invoice.isActive).toBe(true);
    expect(invoice.createdBy).toBe('SYSTEM');
    expect(invoice.createdAt).toEqual(new Date('2023-01-01T00:00:00Z'));
    expect(invoice.updatedBy).toBeNull();
    expect(invoice.updatedAt).toBeNull();
  });
});

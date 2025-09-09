import { Invoice } from '../../../src/modules/invoice/domain/entities/invoice.entity';
import { Trip } from '../../../src/modules/trips/domain/entities/trip.entity';

export const mockTrip: Trip = {
  tripId: 1,
  driverId: 1,
  riderId: 1,
  startLatitude: -12.05,
  startLongitude: -77.03,
  endLatitude: -12.06,
  endLongitude: -77.04,
  status: 1,
  isActive: true,
  createdBy: 'SYSTEM',
  createdAt: new Date(),
  updatedBy: null,
  updatedAt: null,
} as Trip;

export const mockInvoice: Invoice = {
  invoiceId: 1,
  tripId: 1,
  trip: mockTrip,
  amount: 50,
  currency: 'PEN',
} as Invoice;

export const mockCreateInvoice: Invoice = {
  invoiceId: 1,
  tripId: 1,
  amount: 50,
  currency: 'PEN',
  isActive: true,
  createdBy: 'SYSTEM',
  createdAt: new Date(),
  updatedBy: null,
  updatedAt: null,
} as Invoice;

export const invoiceRepositoryMock = {
  getInvoices: jest.fn().mockResolvedValue([mockInvoice]),
  createInvoice: jest.fn().mockResolvedValue(mockCreateInvoice),
};

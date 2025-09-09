import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceApplicationService } from '../../../../src/modules/invoice/application/services/invoice.service';
import { InvoiceDomainService } from '../../../../src/modules/invoice/domain/services/invoice.service';
import { TripDomainService } from '../../../../src/modules/trips/domain/services/trip.service';
import { Invoice } from '../../../../src/modules/invoice/domain/entities/invoice.entity';
import { CreateInvoiceDto } from '../../../../src/modules/invoice/application/dto/create-invoice.dto';

const mockInvoice: Invoice = {
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

const mockApiResponseInvoice = { data: mockInvoice };
const mockApiResponseInvoices = { data: [mockInvoice] };

const invoiceDomainServiceMock = {
  getInvoices: jest.fn().mockResolvedValue([mockInvoice]),
  createInvoice: jest.fn().mockResolvedValue(mockInvoice),
};
const tripDomainServiceMock = {
  getTripById: jest.fn().mockResolvedValue({ tripId: 1 }),
};

describe('InvoiceApplicationService', () => {
  let service: InvoiceApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceApplicationService,
        { provide: InvoiceDomainService, useValue: invoiceDomainServiceMock },
        { provide: TripDomainService, useValue: tripDomainServiceMock },
      ],
    }).compile();
    service = module.get<InvoiceApplicationService>(InvoiceApplicationService);
  });

  it('should return invoices', async () => {
    await expect(service.getInvoices()).resolves.toEqual(
      mockApiResponseInvoices,
    );
    expect(invoiceDomainServiceMock.getInvoices).toHaveBeenCalled();
  });

  it('should throw NotFoundException if no invoices', async () => {
    invoiceDomainServiceMock.getInvoices.mockResolvedValueOnce([]);
    await expect(service.getInvoices()).rejects.toThrow('No invoices found');
  });

  it('should create an invoice', async () => {
    const dto: CreateInvoiceDto = {
      tripId: 1,
      amount: 50,
      currency: 'PEN',
    };
    await expect(service.createInvoice(dto)).resolves.toEqual(
      mockApiResponseInvoice,
    );
    expect(tripDomainServiceMock.getTripById).toHaveBeenCalledWith(1);
    expect(invoiceDomainServiceMock.createInvoice).toHaveBeenCalledWith(dto);
  });

  it('should throw NotFoundException if trip not found', async () => {
    tripDomainServiceMock.getTripById.mockResolvedValueOnce(null);
    const dto: CreateInvoiceDto = {
      tripId: 99,
      amount: 50,
      currency: 'PEN',
    };
    await expect(service.createInvoice(dto)).rejects.toThrow('Trip not found');
  });
});

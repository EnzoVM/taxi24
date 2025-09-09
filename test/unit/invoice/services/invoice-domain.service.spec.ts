import { InvoiceDomainService } from '../../../../src/modules/invoice/domain/services/invoice.service';
import { Invoice } from '../../../../src/modules/invoice/domain/entities/invoice.entity';
import { CreateInvoiceDto } from '../../../../src/modules/invoice/application/dto/create-invoice.dto';
import { Test, TestingModule } from '@nestjs/testing';

describe('InvoiceDomainService', () => {
  let service: InvoiceDomainService;

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

  const invoiceRepositoryMock = {
    getInvoices: jest.fn().mockResolvedValue([mockInvoice]),
    createInvoice: jest.fn().mockResolvedValue(mockInvoice),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceDomainService,
        {
          provide: 'InvoiceInterfaceRepository',
          useValue: invoiceRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<InvoiceDomainService>(InvoiceDomainService);
  });

  it('should return invoices', async () => {
    await expect(service.getInvoices()).resolves.toEqual([mockInvoice]);
    expect(invoiceRepositoryMock.getInvoices).toHaveBeenCalled();
  });

  it('should create an invoice', async () => {
    const dto: CreateInvoiceDto = {
      tripId: 1,
      amount: 50,
      currency: 'PEN',
    };
    await expect(service.createInvoice(dto)).resolves.toEqual(mockInvoice);
    expect(invoiceRepositoryMock.createInvoice).toHaveBeenCalledWith(dto);
  });
});

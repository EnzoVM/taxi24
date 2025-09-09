import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from '../../../../src/modules/invoice/infrastructure/controllers/invoice.controller';
import { InvoiceApplicationService } from '../../../../src/modules/invoice/application/services/invoice.service';
import { Invoice } from '../../../../src/modules/invoice/domain/entities/invoice.entity';
import { CreateInvoiceDto } from '../../../../src/modules/invoice/application/dto/create-invoice.dto';

describe('InvoiceController', () => {
  let controller: InvoiceController;

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

  const invoiceApplicationServiceMock = {
    getInvoices: jest.fn().mockResolvedValue(mockApiResponseInvoices),
    createInvoice: jest.fn().mockResolvedValue(mockApiResponseInvoice),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: InvoiceApplicationService,
          useValue: invoiceApplicationServiceMock,
        },
      ],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
  });

  it('should return invoices', async () => {
    await expect(controller.getInvoices()).resolves.toEqual(
      mockApiResponseInvoices,
    );
    expect(invoiceApplicationServiceMock.getInvoices).toHaveBeenCalled();
  });

  it('should create an invoice', async () => {
    const dto: CreateInvoiceDto = {
      tripId: 1,
      amount: 50,
      currency: 'PEN',
    };
    await expect(controller.createInvoice(dto)).resolves.toEqual(
      mockApiResponseInvoice,
    );
    expect(invoiceApplicationServiceMock.createInvoice).toHaveBeenCalledWith(
      dto,
    );
  });
});

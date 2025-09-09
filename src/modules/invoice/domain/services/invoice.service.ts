import { Inject, Injectable } from '@nestjs/common';
import type { InvoiceInterfaceRepository } from '../interfaces/invoice.interface';
import { Invoice } from '../entities/invoice.entity';
import { CreateInvoiceDto } from '../../application/dto/create-invoice.dto';

@Injectable()
export class InvoiceDomainService {
  constructor(
    @Inject('InvoiceInterfaceRepository')
    private readonly invoiceRepository: InvoiceInterfaceRepository,
  ) {}

  async getInvoices(): Promise<Invoice[]> {
    return await this.invoiceRepository.getInvoices();
  }

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return await this.invoiceRepository.createInvoice(createInvoiceDto);
  }
}

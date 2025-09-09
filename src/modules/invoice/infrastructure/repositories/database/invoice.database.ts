import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../../domain/entities/invoice.entity';
import { InvoiceInterfaceRepository } from '../../../domain/interfaces/invoice.interface';
import { Repository } from 'typeorm';
import { IS_ACTIVE } from '../../../../shared/constants/app.constants';
import { CreateInvoiceDto } from '../../../application/dto/create-invoice.dto';

@Injectable()
export class InvoiceRepository implements InvoiceInterfaceRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceDatabase: Repository<Invoice>,
  ) {}

  async getInvoices(): Promise<Invoice[]> {
    return await this.invoiceDatabase.find({
      select: ['invoiceId', 'tripId', 'amount', 'currency'],
      where: { isActive: IS_ACTIVE },
      relations: ['trip'],
    });
  }

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = this.invoiceDatabase.create(createInvoiceDto);
    return await this.invoiceDatabase.save(invoice);
  }
}

import { CreateInvoiceDto } from '../../application/dto/create-invoice.dto';
import { Invoice } from '../entities/invoice.entity';

export interface InvoiceInterfaceRepository {
  getInvoices(): Promise<Invoice[]>;
  createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice>;
}

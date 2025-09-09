import { Body, Controller, Get, Post } from '@nestjs/common';
import { InvoiceApplicationService } from '../../application/services/invoice.service';
import { ApiResponse } from '../../../shared/interfaces/response.interface';
import { Invoice } from '../../domain/entities/invoice.entity';
import { CreateInvoiceDto } from '../../application/dto/create-invoice.dto';

@Controller('v1/invoices')
export class InvoiceController {
  constructor(
    private readonly invoiceApplicationService: InvoiceApplicationService,
  ) {}

  @Get()
  async getInvoices(): Promise<ApiResponse<Invoice[]>> {
    return await this.invoiceApplicationService.getInvoices();
  }

  @Post()
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<ApiResponse<Invoice>> {
    return await this.invoiceApplicationService.createInvoice(createInvoiceDto);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceDomainService } from '../../domain/services/invoice.service';
import { Invoice } from '../../domain/entities/invoice.entity';
import { ApiResponse } from '../../../shared/interfaces/response.interface';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { TripDomainService } from '../../../trips/domain/services/trip.service';

@Injectable()
export class InvoiceApplicationService {
  constructor(
    private readonly invoiceDomainService: InvoiceDomainService,
    private readonly tripDomainService: TripDomainService,
  ) {}

  async getInvoices(): Promise<ApiResponse<Invoice[]>> {
    const invoicesFound = await this.invoiceDomainService.getInvoices();

    if (invoicesFound.length === 0) {
      throw new NotFoundException('No invoices found');
    }

    return {
      data: invoicesFound,
    };
  }

  async createInvoice(
    createInvoiceDto: CreateInvoiceDto,
  ): Promise<ApiResponse<Invoice>> {
    const tripFound = await this.tripDomainService.getTripById(
      createInvoiceDto.tripId,
    );

    if (!tripFound) {
      throw new NotFoundException('Trip not found');
    }

    const invoice =
      await this.invoiceDomainService.createInvoice(createInvoiceDto);

    return {
      data: invoice,
    };
  }
}

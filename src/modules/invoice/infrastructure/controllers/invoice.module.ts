import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceController } from './invoice.controller';
import { InvoiceApplicationService } from '../../application/services/invoice.service';
import { InvoiceDomainService } from '../../domain/services/invoice.service';
import { InvoiceRepository } from '../repositories/database/invoice.database';
import { Invoice } from '../../domain/entities/invoice.entity';
import { Trip } from '../../../trips/domain/entities/trip.entity';
import { TripDomainService } from '../../../trips/domain/services/trip.service';
import { TripRepository } from '../../../trips/infrastructure/repositories/database/trip.database';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Trip])],
  controllers: [InvoiceController],
  providers: [
    InvoiceApplicationService,
    InvoiceDomainService,
    TripDomainService,
    {
      provide: 'InvoiceInterfaceRepository',
      useClass: InvoiceRepository,
    },
    {
      provide: 'TripInterfaceRepository',
      useClass: TripRepository,
    },
  ],
})
export class InvoiceModule {}

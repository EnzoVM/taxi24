import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripController } from './trip.controller';
import { TripApplicationService } from '../../application/services/trip.service';
import { TripDomainService } from '../../domain/services/trip.service';
import { TripRepository } from '../repositories/database/trip.database';
import { Trip } from '../../domain/entities/trip.entity';
import { DriverDomainService } from '../../../drivers/domain/services/driver.service';
import { DriverRepository } from '../../../drivers/infrastructure/repositories/database/driver.database';
import { Driver } from '../../../drivers/domain/entities/driver.entity';
import { Invoice } from '../../../invoice/domain/entities/invoice.entity';
import { InvoiceDomainService } from '../../../invoice/domain/services/invoice.service';
import { InvoiceRepository } from '../../../invoice/infrastructure/repositories/database/invoice.database';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Driver, Invoice])],
  controllers: [TripController],
  providers: [
    TripApplicationService,
    TripDomainService,
    DriverDomainService,
    InvoiceDomainService,
    {
      provide: 'TripInterfaceRepository',
      useClass: TripRepository,
    },
    {
      provide: 'DriverInterfaceRepository',
      useClass: DriverRepository,
    },
    {
      provide: 'InvoiceInterfaceRepository',
      useClass: InvoiceRepository,
    },
  ],
})
export class TripModule {}

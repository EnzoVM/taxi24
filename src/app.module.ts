import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverModule } from './modules/drivers/infrastructure/controllers/driver.module';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './database/data-source';
import { RiderModule } from './modules/riders/infrastructure/controllers/rider.module';
import { TripModule } from './modules/trips/infrastructure/controllers/trip.module';
import { InvoiceModule } from './modules/invoice/infrastructure/controllers/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbConfig),
    DriverModule,
    RiderModule,
    TripModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

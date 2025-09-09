import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TripDomainService } from '../../domain/services/trip.service';
import { Trip } from '../../domain/entities/trip.entity';
import { ApiResponse } from '../../../shared/interfaces/response.interface';
import { CreateTripDto } from '../dto/create-trip.dto';
import { DriverDomainService } from '../../../drivers/domain/services/driver.service';
import { DriverStatus } from '../../../drivers/domain/enums/driver-status.enum';
import { InvoiceDomainService } from '../../../invoice/domain/services/invoice.service';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { TripStatus } from '../../domain/enums/trip-status.enum';

@Injectable()
export class TripApplicationService {
  constructor(
    private readonly tripDomainService: TripDomainService,
    private readonly driverDomainService: DriverDomainService,
    private readonly invoiceDomainService: InvoiceDomainService,
  ) {}

  async getActiveTrips(): Promise<ApiResponse<Trip[]>> {
    const activeTripsFound = await this.tripDomainService.getActiveTrips();

    if (activeTripsFound.length === 0) {
      throw new NotFoundException('No active trips found');
    }

    return {
      data: activeTripsFound,
    };
  }

  async completeTrip(
    tripId: number,
    body: CreateInvoiceDto,
  ): Promise<ApiResponse<string>> {
    const tripFound = await this.tripDomainService.getTripById(tripId);

    if (!tripFound) {
      throw new NotFoundException('Trip not found');
    }

    if (tripFound.status !== Number(TripStatus.Active)) {
      throw new BadRequestException('Trip is not active');
    }

    await this.tripDomainService.completeTrip(tripFound.tripId);

    await this.driverDomainService.updateDriverStatusById(
      tripFound.driverId,
      DriverStatus.Available,
    );

    await this.invoiceDomainService.createInvoice({
      tripId: tripFound.tripId,
      amount: body.amount,
      currency: body.currency,
    });

    return {
      data: 'Trip completed successfully',
    };
  }

  async createTrip(createTripDto: CreateTripDto): Promise<ApiResponse<Trip>> {
    const driverFound = await this.driverDomainService.getDriverById(
      createTripDto.driverId,
    );

    if (!driverFound) {
      throw new NotFoundException('Driver not found');
    }

    if (driverFound.status !== Number(DriverStatus.Available)) {
      throw new BadRequestException('Driver is not available');
    }

    const trip = await this.tripDomainService.createTrip(createTripDto);

    await this.driverDomainService.updateDriverStatusById(
      driverFound.driverId,
      DriverStatus.Busy,
    );

    return {
      data: trip,
    };
  }
}

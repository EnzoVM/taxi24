import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from '../../../domain/entities/trip.entity';
import { TripInterfaceRepository } from '../../../domain/interfaces/trip.interface';
import { Repository } from 'typeorm';
import { TripStatus } from '../../../domain/enums/trip-status.enum';
import { IS_ACTIVE } from '../../../../shared/constants/app.constants';
import { CreateTripDto } from '../../../application/dto/create-trip.dto';

@Injectable()
export class TripRepository implements TripInterfaceRepository {
  constructor(
    @InjectRepository(Trip)
    private readonly tripDatabase: Repository<Trip>,
  ) {}

  async getActiveTrips(): Promise<Trip[]> {
    return await this.tripDatabase.find({
      select: [
        'tripId',
        'driverId',
        'riderId',
        'startLatitude',
        'startLongitude',
        'endLatitude',
        'endLongitude',
        'status',
      ],
      where: { status: TripStatus.Active, isActive: IS_ACTIVE },
    });
  }

  async completeTrip(tripId: number): Promise<void> {
    await this.tripDatabase.update(tripId, {
      status: TripStatus.Completed,
      updatedBy: 'SYSTEM',
      updatedAt: new Date(),
    });
  }

  async createTrip(createTripDto: CreateTripDto): Promise<Trip> {
    const trip = this.tripDatabase.create(createTripDto);
    return await this.tripDatabase.save(trip);
  }

  async getTripById(tripId: number): Promise<Trip | null> {
    return await this.tripDatabase.findOne({
      select: [
        'tripId',
        'driverId',
        'riderId',
        'startLatitude',
        'startLongitude',
        'endLatitude',
        'endLongitude',
        'status',
      ],
      where: { tripId, isActive: IS_ACTIVE },
    });
  }
}

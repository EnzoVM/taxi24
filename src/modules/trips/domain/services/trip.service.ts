import { Inject, Injectable } from '@nestjs/common';
import type { TripInterfaceRepository } from '../interfaces/trip.interface';
import { Trip } from '../entities/trip.entity';
import { CreateTripDto } from '../../application/dto/create-trip.dto';

@Injectable()
export class TripDomainService {
  constructor(
    @Inject('TripInterfaceRepository')
    private readonly tripRepository: TripInterfaceRepository,
  ) {}

  async getActiveTrips(): Promise<Trip[]> {
    return await this.tripRepository.getActiveTrips();
  }

  async completeTrip(tripId: number): Promise<void> {
    await this.tripRepository.completeTrip(tripId);
  }

  async createTrip(createTripDto: CreateTripDto): Promise<Trip> {
    return await this.tripRepository.createTrip(createTripDto);
  }

  async getTripById(tripId: number): Promise<Trip | null> {
    return await this.tripRepository.getTripById(tripId);
  }
}

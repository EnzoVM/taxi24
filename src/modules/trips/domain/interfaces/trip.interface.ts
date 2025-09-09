import { CreateTripDto } from '../../application/dto/create-trip.dto';
import { Trip } from '../entities/trip.entity';

export interface TripInterfaceRepository {
  getActiveTrips(): Promise<Trip[]>;
  completeTrip(tripId: number): Promise<void>;
  createTrip(createTripDto: CreateTripDto): Promise<Trip>;
  getTripById(tripId: number): Promise<Trip | null>;
}

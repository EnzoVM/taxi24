import { Rider } from '../entities/rider.entity';

export interface RiderInterfaceRepository {
  getRiders(): Promise<Rider[]>;
  getRiderById(riderId: number): Promise<Rider | null>;
}

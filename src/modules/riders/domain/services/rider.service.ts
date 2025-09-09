import { Inject, Injectable } from '@nestjs/common';
import type { RiderInterfaceRepository } from '../interfaces/rider.interface';
import { Rider } from '../entities/rider.entity';

@Injectable()
export class RiderDomainService {
  constructor(
    @Inject('RiderInterfaceRepository')
    private readonly riderRepository: RiderInterfaceRepository,
  ) {}

  async getRiders(): Promise<Rider[]> {
    return await this.riderRepository.getRiders();
  }

  async getRiderById(riderId: number): Promise<Rider | null> {
    return await this.riderRepository.getRiderById(riderId);
  }
}

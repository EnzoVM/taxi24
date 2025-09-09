import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rider } from '../../../domain/entities/rider.entity';
import { RiderInterfaceRepository } from '../../../domain/interfaces/rider.interface';
import { Repository } from 'typeorm';
import { IS_ACTIVE } from '../../../../shared/constants/app.constants';

@Injectable()
export class RiderRepository implements RiderInterfaceRepository {
  constructor(
    @InjectRepository(Rider)
    private readonly riderDatabase: Repository<Rider>,
  ) {}

  async getRiders(): Promise<Rider[]> {
    return await this.riderDatabase.find({
      select: [
        'riderId',
        'name',
        'lastname',
        'latitude',
        'longitude',
        'isActive',
      ],
    });
  }

  async getRiderById(riderId: number): Promise<Rider | null> {
    return await this.riderDatabase.findOne({
      select: [
        'riderId',
        'name',
        'lastname',
        'latitude',
        'longitude',
        'isActive',
      ],
      where: { riderId, isActive: IS_ACTIVE },
    });
  }
}

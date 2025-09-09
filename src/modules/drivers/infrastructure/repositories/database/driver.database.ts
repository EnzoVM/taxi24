import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverInterfaceRepository } from '../../../domain/interfaces/driver.interface';
import { Driver } from '../../../domain/entities/driver.entity';
import { DriverStatus } from '../../../domain/enums/driver-status.enum';
import { IS_ACTIVE } from '../../../../shared/constants/app.constants';

@Injectable()
export class DriverRepository implements DriverInterfaceRepository {
  constructor(
    @InjectRepository(Driver)
    private readonly driverDatabase: Repository<Driver>,
  ) {}

  async getDrivers(): Promise<Driver[]> {
    return await this.driverDatabase.find({
      select: [
        'driverId',
        'name',
        'lastname',
        'latitude',
        'longitude',
        'status',
        'isActive',
      ],
    });
  }

  async getAvailableDrivers(): Promise<Driver[]> {
    return await this.driverDatabase.find({
      select: [
        'driverId',
        'name',
        'lastname',
        'latitude',
        'longitude',
        'status',
        'isActive',
      ],
      where: {
        status: DriverStatus.Available,
        isActive: IS_ACTIVE,
      },
    });
  }

  async getDriverById(driverId: number): Promise<Driver | null> {
    return await this.driverDatabase.findOne({
      select: [
        'driverId',
        'name',
        'lastname',
        'latitude',
        'longitude',
        'status',
        'isActive',
      ],
      where: { driverId, isActive: IS_ACTIVE },
    });
  }

  async updateDriverStatusById(
    driverId: number,
    status: number,
  ): Promise<void> {
    await this.driverDatabase.update(driverId, { status });
  }
}

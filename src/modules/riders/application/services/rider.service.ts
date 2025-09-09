import { Injectable, NotFoundException } from '@nestjs/common';
import { RiderDomainService } from '../../domain/services/rider.service';
import { Rider } from '../../domain/entities/rider.entity';
import { DriverDomainService } from '../../../drivers/domain/services/driver.service';
import { Driver } from '../../../drivers/domain/entities/driver.entity';
import { ApiResponse } from '../../../shared/interfaces/response.interface';

@Injectable()
export class RiderApplicationService {
  constructor(
    private readonly riderDomainService: RiderDomainService,
    private readonly driverDomainService: DriverDomainService,
  ) {}

  async getRiders(): Promise<ApiResponse<Rider[]>> {
    const ridersFound = await this.riderDomainService.getRiders();

    if (ridersFound.length === 0) {
      throw new NotFoundException('No drivers found');
    }

    return {
      data: ridersFound,
    };
  }

  async getRiderById(riderId: number): Promise<ApiResponse<Rider>> {
    const riderFound = await this.riderDomainService.getRiderById(riderId);

    if (!riderFound) {
      throw new NotFoundException(`Rider with ID ${riderId} not found`);
    }

    return {
      data: riderFound,
    };
  }

  async getNearestDrivers(riderId: number): Promise<ApiResponse<Driver[]>> {
    const riderFound = await this.riderDomainService.getRiderById(riderId);

    if (!riderFound) {
      throw new NotFoundException(`Rider with ID ${riderId} not found`);
    }

    const availableDrivers =
      await this.driverDomainService.getAvailableDrivers();

    if (availableDrivers.length === 0) {
      throw new NotFoundException(`No available drivers found in this moment`);
    }

    const driversWithDistance = availableDrivers.map((driver) => {
      const distance = this.driverDomainService.calculateDistance(
        riderFound.latitude,
        riderFound.longitude,
        driver.latitude,
        driver.longitude,
      );
      return { ...driver, distance };
    });

    driversWithDistance.sort((a, b) => a.distance - b.distance);

    return {
      data: driversWithDistance.slice(0, 3),
    };
  }
}

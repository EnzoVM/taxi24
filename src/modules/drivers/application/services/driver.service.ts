import { Injectable, NotFoundException } from '@nestjs/common';
import { DriverDomainService } from '../../domain/services/driver.service';
import { Driver } from '../../domain/entities/driver.entity';
import { ApiResponse } from '../../../shared/interfaces/response.interface';

@Injectable()
export class DriverApplicationService {
  constructor(private readonly driverDomainService: DriverDomainService) {}

  async getDrivers(): Promise<ApiResponse<Driver[]>> {
    const driversFound = await this.driverDomainService.getDrivers();

    if (driversFound.length === 0) {
      throw new NotFoundException('No drivers found');
    }

    return {
      data: driversFound,
    };
  }

  async getAvailableDrivers(): Promise<Promise<ApiResponse<Driver[]>>> {
    const availableDriversFound =
      await this.driverDomainService.getAvailableDrivers();

    if (availableDriversFound.length === 0) {
      throw new NotFoundException('No available drivers found');
    }

    return {
      data: availableDriversFound,
    };
  }

  async getDriverById(driverId: number): Promise<ApiResponse<Driver>> {
    const driverFound = await this.driverDomainService.getDriverById(driverId);

    if (!driverFound) {
      throw new NotFoundException(`Driver with ID ${driverId} not found`);
    }

    return {
      data: driverFound,
    };
  }

  async getAvailableDriversByRadius(
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<ApiResponse<Driver[]>> {
    const driversFound = await this.driverDomainService.getAvailableDrivers();

    if (driversFound.length === 0) {
      throw new NotFoundException('No available drivers found');
    }

    const nearbyDrivers = driversFound.filter(
      (driver) =>
        this.driverDomainService.calculateDistance(
          latitude,
          longitude,
          driver.latitude,
          driver.longitude,
        ) <= radius,
    );

    if (nearbyDrivers.length === 0) {
      throw new NotFoundException(
        `No available drivers found within the specified radius: ${radius} km`,
      );
    }

    return {
      data: nearbyDrivers,
    };
  }
}

import { Inject, Injectable } from '@nestjs/common';
import type { DriverInterfaceRepository } from '../interfaces/driver.interface';
import { Driver } from '../entities/driver.entity';

@Injectable()
export class DriverDomainService {
  constructor(
    @Inject('DriverInterfaceRepository')
    private readonly driverRepository: DriverInterfaceRepository,
  ) {}

  async getDrivers(): Promise<Driver[]> {
    return await this.driverRepository.getDrivers();
  }

  async getAvailableDrivers(): Promise<Driver[]> {
    return await this.driverRepository.getAvailableDrivers();
  }

  async getDriverById(driverId: number): Promise<Driver | null> {
    return await this.driverRepository.getDriverById(driverId);
  }

  calculateDistance(
    latitude1: number,
    longitude1: number,
    latitude2: number,
    longitude2: number,
  ): number {
    const R = 6371;
    const dLat = ((latitude2 - latitude1) * Math.PI) / 180;
    const dLng = ((longitude2 - longitude1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((latitude1 * Math.PI) / 180) *
        Math.cos((latitude2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async updateDriverStatusById(
    driverId: number,
    status: number,
  ): Promise<void> {
    await this.driverRepository.updateDriverStatusById(driverId, status);
  }
}

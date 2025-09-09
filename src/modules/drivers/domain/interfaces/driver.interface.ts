import { Driver } from '../entities/driver.entity';

export interface DriverInterfaceRepository {
  getDrivers(): Promise<Driver[]>;
  getAvailableDrivers(): Promise<Driver[]>;
  getDriverById(driverId: number): Promise<Driver | null>;
  updateDriverStatusById(driverId: number, status: number): Promise<void>;
}

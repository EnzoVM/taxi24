import { Driver } from '../../../src/modules/drivers/domain/entities/driver.entity';

export const mockDrivers: Driver[] = [
  {
    driverId: 1,
    name: 'Juan',
    lastname: 'Pérez Gómez',
    latitude: -12.0464,
    longitude: -77.0428,
    status: 1,
    isActive: true,
  } as Driver,
  {
    driverId: 2,
    name: 'Ana',
    lastname: 'García Torres',
    latitude: -12.05,
    longitude: -77.03,
    status: 1,
    isActive: true,
  } as Driver,
];

export const driverRepositoryMock = {
  getDrivers: jest.fn().mockResolvedValue(mockDrivers),
  getAvailableDrivers: jest.fn().mockResolvedValue(mockDrivers),
  getDriverById: jest.fn().mockResolvedValue(mockDrivers[1]),
  updateDriverStatusById: jest.fn().mockResolvedValue(undefined),
};

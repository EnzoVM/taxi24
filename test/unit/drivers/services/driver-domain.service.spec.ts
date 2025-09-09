import { DriverDomainService } from '../../../../src/modules/drivers/domain/services/driver.service';
import { Driver } from '../../../../src/modules/drivers/domain/entities/driver.entity';
import { Test, TestingModule } from '@nestjs/testing';

describe('DriverDomainService', () => {
  let service: DriverDomainService;

  const mockDrivers: Driver[] = [
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
      status: 2,
      isActive: true,
    } as Driver,
  ];

  const driverRepositoryMock = {
    getDrivers: jest.fn().mockResolvedValue(mockDrivers),
    getAvailableDrivers: jest.fn().mockResolvedValue([mockDrivers[0]]),
    getDriverById: jest.fn().mockResolvedValue(mockDrivers[1]),
    updateDriverStatusById: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverDomainService,
        {
          provide: 'DriverInterfaceRepository',
          useValue: driverRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<DriverDomainService>(DriverDomainService);
  });

  it('should return all drivers', async () => {
    await expect(service.getDrivers()).resolves.toEqual(mockDrivers);
  });

  it('should return available drivers', async () => {
    await expect(service.getAvailableDrivers()).resolves.toEqual([
      mockDrivers[0],
    ]);
  });

  it('should return driver by id', async () => {
    await expect(service.getDriverById(2)).resolves.toEqual(mockDrivers[1]);
  });

  it('should calculate distance correctly', () => {
    const dist = service.calculateDistance(-12.0464, -77.0428, -12.05, -77.03);
    expect(typeof dist).toBe('number');
    expect(dist).toBeGreaterThan(0);
  });

  it('should call repository to update driver status', async () => {
    await service.updateDriverStatusById(1, 2);
    expect(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (service as any).driverRepository.updateDriverStatusById,
    ).toHaveBeenCalledWith(1, 2);
  });
});

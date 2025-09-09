import { NotFoundException } from '@nestjs/common';
import { DriverApplicationService } from '../../../../src/modules/drivers/application/services/driver.service';
import { DriverDomainService } from '../../../../src/modules/drivers/domain/services/driver.service';
import { Driver } from '../../../../src/modules/drivers/domain/entities/driver.entity';
import { Test, TestingModule } from '@nestjs/testing';

describe('DriverApplicationService', () => {
  let service: DriverApplicationService;

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

  const driverDomainServiceMock = {
    getDrivers: jest.fn().mockResolvedValue(mockDrivers),
    getAvailableDrivers: jest.fn().mockResolvedValue([mockDrivers[0]]),
    getDriverById: jest.fn().mockResolvedValue(mockDrivers[1]),
    calculateDistance: jest.fn().mockReturnValue(2),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverApplicationService,
        {
          provide: DriverDomainService,
          useValue: driverDomainServiceMock,
        },
      ],
    }).compile();

    service = module.get<DriverApplicationService>(DriverApplicationService);
  });

  it('should return all drivers', async () => {
    await expect(service.getDrivers()).resolves.toEqual({
      data: mockDrivers,
    });
  });

  it('should throw NotFoundException if no drivers found', async () => {
    driverDomainServiceMock.getDrivers.mockResolvedValue([]);
    await expect(service.getDrivers()).rejects.toThrow(NotFoundException);
  });

  it('should return available drivers', async () => {
    await expect(service.getAvailableDrivers()).resolves.toEqual({
      data: [mockDrivers[0]],
    });
  });

  it('should throw NotFoundException if no available drivers found', async () => {
    driverDomainServiceMock.getAvailableDrivers.mockResolvedValue([]);
    await expect(service.getAvailableDrivers()).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return driver by id', async () => {
    await expect(service.getDriverById(2)).resolves.toEqual({
      data: mockDrivers[1],
    });
  });

  it('should throw NotFoundException if driver not found', async () => {
    driverDomainServiceMock.getDriverById.mockResolvedValue(null);
    await expect(service.getDriverById(99)).rejects.toThrow(NotFoundException);
  });

  it('should return available drivers by radius', async () => {
    driverDomainServiceMock.getAvailableDrivers.mockResolvedValue([
      mockDrivers[0],
    ]);
    await expect(
      service.getAvailableDriversByRadius(-12.052581, -77.029835, 3),
    ).resolves.toEqual({
      data: [mockDrivers[0]],
    });
  });

  it('should throw NotFoundException if no drivers found in radius', async () => {
    driverDomainServiceMock.getAvailableDrivers.mockResolvedValue([]);
    await expect(
      service.getAvailableDriversByRadius(-12.052581, -77.029835, 3),
    ).rejects.toThrow(NotFoundException);
  });
});

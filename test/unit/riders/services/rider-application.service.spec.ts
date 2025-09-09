import { NotFoundException } from '@nestjs/common';
import { RiderApplicationService } from '../../../../src/modules/riders/application/services/rider.service';
import { RiderDomainService } from '../../../../src/modules/riders/domain/services/rider.service';
import { DriverDomainService } from '../../../../src/modules/drivers/domain/services/driver.service';
import { Rider } from '../../../../src/modules/riders/domain/entities/rider.entity';
import { Driver } from '../../../../src/modules/drivers/domain/entities/driver.entity';
import { Test, TestingModule } from '@nestjs/testing';

describe('RiderApplicationService', () => {
  let service: RiderApplicationService;

  const mockRiders: Rider[] = [
    {
      riderId: 1,
      name: 'Carlos',
      lastname: 'Ramírez',
      latitude: -12.05,
      longitude: -77.03,
      isActive: true,
    } as Rider,
  ];

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
  ];

  const riderDomainServiceMock = {
    getRiders: jest.fn().mockResolvedValue(mockRiders),
    getRiderById: jest.fn().mockResolvedValue(mockRiders[0]),
  };

  const driverDomainServiceMock = {
    getAvailableDrivers: jest.fn().mockResolvedValue(mockDrivers),
    calculateDistance: jest.fn().mockReturnValue(1.5),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        RiderApplicationService,
        {
          provide: RiderDomainService,
          useValue: riderDomainServiceMock,
        },
        {
          provide: DriverDomainService,
          useValue: driverDomainServiceMock,
        },
      ],
    }).compile();

    service = module.get<RiderApplicationService>(RiderApplicationService);
  });

  it('should return all riders', async () => {
    await expect(service.getRiders()).resolves.toEqual({ data: mockRiders });
  });

  it('should throw NotFoundException if no riders found', async () => {
    riderDomainServiceMock.getRiders.mockResolvedValue([]);
    await expect(service.getRiders()).rejects.toThrow(NotFoundException);
  });

  it('should return rider by id', async () => {
    await expect(service.getRiderById(1)).resolves.toEqual({
      data: mockRiders[0],
    });
  });

  it('should throw NotFoundException if rider not found', async () => {
    riderDomainServiceMock.getRiderById.mockResolvedValue(null);
    await expect(service.getRiderById(99)).rejects.toThrow(NotFoundException);
  });

  it('should return nearest drivers for rider', async () => {
    riderDomainServiceMock.getRiderById.mockResolvedValue(mockRiders[0]);
    await expect(service.getNearestDrivers(1)).resolves.toEqual({
      data: [{ ...mockDrivers[0], distance: 1.5 }],
    });
  });

  it('should throw NotFoundException if rider not found (nearest drivers)', async () => {
    riderDomainServiceMock.getRiderById.mockResolvedValue(null);
    await expect(service.getNearestDrivers(99)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw NotFoundException if no available drivers found', async () => {
    driverDomainServiceMock.getAvailableDrivers.mockResolvedValue([]);
    await expect(service.getNearestDrivers(1)).rejects.toThrow(
      NotFoundException,
    );
  });
});

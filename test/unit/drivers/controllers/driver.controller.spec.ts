import { Test, TestingModule } from '@nestjs/testing';
import { DriverController } from '../../../../src/modules/drivers/infrastructure/controllers/driver.controller';
import { DriverApplicationService } from '../../../../src/modules/drivers/application/services/driver.service';
import { Driver } from '../../../../src/modules/drivers/domain/entities/driver.entity';

describe('DriverController', () => {
  let controller: DriverController;

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

  const driverApplicationServiceMock = {
    getDrivers: jest.fn().mockResolvedValue({ data: mockDrivers }),
    getAvailableDrivers: jest
      .fn()
      .mockResolvedValue({ data: [mockDrivers[0]] }),
    getDriverById: jest.fn().mockResolvedValue({ data: mockDrivers[1] }),
    getAvailableDriversByRadius: jest
      .fn()
      .mockResolvedValue({ data: [mockDrivers[1]] }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [
        {
          provide: DriverApplicationService,
          useValue: driverApplicationServiceMock,
        },
      ],
    }).compile();

    controller = module.get<DriverController>(DriverController);
  });

  it('should return all drivers', async () => {
    await expect(controller.getDrivers()).resolves.toEqual({
      data: mockDrivers,
    });
  });

  it('should return available drivers', async () => {
    await expect(controller.getAvailableDrivers()).resolves.toEqual({
      data: [mockDrivers[0]],
    });
  });

  it('should return driver by id', async () => {
    await expect(controller.getDriverById({ driverId: 2 })).resolves.toEqual({
      data: mockDrivers[1],
    });
  });

  it('should return available drivers by radius', async () => {
    await expect(
      controller.getAvailableDriversByRadius({
        latitude: -12.052581,
        longitude: -77.029835,
        radius: 3,
      }),
    ).resolves.toEqual({
      data: [mockDrivers[1]],
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { Driver } from '../../../../src/modules/drivers/domain/entities/driver.entity';
import { Rider } from '../../../../src/modules/riders/domain/entities/rider.entity';
import { RiderController } from '../../../../src/modules/riders/infrastructure/controllers/rider.controller';
import { RiderApplicationService } from '../../../../src/modules/riders/application/services/rider.service';

describe('RiderController', () => {
  let controller: RiderController;

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

  const riderApplicationServiceMock = {
    getRiders: jest.fn().mockResolvedValue({ data: mockRiders }),
    getRiderById: jest.fn().mockResolvedValue({ data: mockRiders[0] }),
    getNearestDrivers: jest.fn().mockResolvedValue({ data: mockDrivers }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiderController],
      providers: [
        {
          provide: RiderApplicationService,
          useValue: riderApplicationServiceMock,
        },
      ],
    }).compile();

    controller = module.get<RiderController>(RiderController);
  });

  it('should return all riders', async () => {
    await expect(controller.getRiders()).resolves.toEqual({ data: mockRiders });
  });

  it('should return rider by id', async () => {
    await expect(controller.getRiderById({ riderId: 1 })).resolves.toEqual({
      data: mockRiders[0],
    });
  });

  it('should return nearest drivers for rider', async () => {
    await expect(controller.getNearestDrivers({ riderId: 1 })).resolves.toEqual(
      {
        data: mockDrivers,
      },
    );
  });
});

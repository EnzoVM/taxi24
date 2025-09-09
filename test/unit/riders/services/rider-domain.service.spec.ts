import { RiderDomainService } from '../../../../src/modules/riders/domain/services/rider.service';
import { Rider } from '../../../../src/modules/riders/domain/entities/rider.entity';
import { Test, TestingModule } from '@nestjs/testing';

describe('RiderDomainService', () => {
  let service: RiderDomainService;

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

  const riderRepositoryMock = {
    getRiders: jest.fn().mockResolvedValue(mockRiders),
    getRiderById: jest.fn().mockResolvedValue(mockRiders[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        RiderDomainService,
        {
          provide: 'RiderInterfaceRepository',
          useValue: riderRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<RiderDomainService>(RiderDomainService);
  });

  it('should return all riders', async () => {
    await expect(service.getRiders()).resolves.toEqual(mockRiders);
  });

  it('should return rider by id', async () => {
    await expect(service.getRiderById(1)).resolves.toEqual(mockRiders[0]);
  });

  it('should return null if rider not found', async () => {
    riderRepositoryMock.getRiderById.mockResolvedValue(null);
    await expect(service.getRiderById(99)).resolves.toBeNull();
  });
});

import { TripDomainService } from '../../../../src/modules/trips/domain/services/trip.service';
import { Trip } from '../../../../src/modules/trips/domain/entities/trip.entity';
import { CreateTripDto } from '../../../../src/modules/trips/application/dto/create-trip.dto';
import { Test, TestingModule } from '@nestjs/testing';

describe('TripDomainService', () => {
  let service: TripDomainService;

  const mockTrip: Trip = {
    tripId: 1,
    driverId: 1,
    riderId: 1,
    startLatitude: -12.05,
    startLongitude: -77.03,
    endLatitude: -12.06,
    endLongitude: -77.04,
    status: 1,
    isActive: true,
    createdBy: 'SYSTEM',
    createdAt: new Date(),
    updatedBy: null,
    updatedAt: null,
  } as Trip;

  const tripRepositoryMock = {
    getActiveTrips: jest.fn().mockResolvedValue([mockTrip]),
    completeTrip: jest.fn().mockResolvedValue(undefined),
    createTrip: jest.fn().mockResolvedValue(mockTrip),
    getTripById: jest.fn().mockResolvedValue(mockTrip),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripDomainService,
        {
          provide: 'TripInterfaceRepository',
          useValue: tripRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<TripDomainService>(TripDomainService);
  });

  it('should return active trips', async () => {
    await expect(service.getActiveTrips()).resolves.toEqual([mockTrip]);
    expect(tripRepositoryMock.getActiveTrips).toHaveBeenCalled();
  });

  it('should complete a trip', async () => {
    await expect(service.completeTrip(1)).resolves.toBeUndefined();
    expect(tripRepositoryMock.completeTrip).toHaveBeenCalledWith(1);
  });

  it('should create a trip', async () => {
    const dto: CreateTripDto = {
      driverId: 1,
      riderId: 1,
      startLatitude: -12.05,
      startLongitude: -77.03,
      endLatitude: -12.06,
      endLongitude: -77.04,
    };
    await expect(service.createTrip(dto)).resolves.toEqual(mockTrip);
    expect(tripRepositoryMock.createTrip).toHaveBeenCalledWith(dto);
  });

  it('should return trip by id', async () => {
    await expect(service.getTripById(1)).resolves.toEqual(mockTrip);
    expect(tripRepositoryMock.getTripById).toHaveBeenCalledWith(1);
  });

  it('should return null if trip not found', async () => {
    tripRepositoryMock.getTripById.mockResolvedValueOnce(null);
    await expect(service.getTripById(99)).resolves.toBeNull();
  });
});

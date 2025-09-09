import { Test, TestingModule } from '@nestjs/testing';
import { TripController } from '../../../../src/modules/trips/infrastructure/controllers/trip.controller';
import { TripApplicationService } from '../../../../src/modules/trips/application/services/trip.service';
import { CreateTripDto } from '../../../../src/modules/trips/application/dto/create-trip.dto';
import { CreateInvoiceDto } from '../../../../src/modules/trips/application/dto/create-invoice.dto';
import { Trip } from '../../../../src/modules/trips/domain/entities/trip.entity';

describe('TripController', () => {
  let controller: TripController;

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

  const mockApiResponseTrip = { data: mockTrip };
  const mockApiResponseTrips = { data: [mockTrip] };
  const mockApiResponseString = { data: 'Trip completed successfully' };

  const tripApplicationServiceMock = {
    getActiveTrips: jest.fn().mockResolvedValue(mockApiResponseTrips),
    completeTrip: jest.fn().mockResolvedValue(mockApiResponseString),
    createTrip: jest.fn().mockResolvedValue(mockApiResponseTrip),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        {
          provide: TripApplicationService,
          useValue: tripApplicationServiceMock,
        },
      ],
    }).compile();

    controller = module.get<TripController>(TripController);
  });

  it('should return active trips', async () => {
    await expect(controller.getActiveTrips()).resolves.toEqual(
      mockApiResponseTrips,
    );
  });

  it('should complete a trip', async () => {
    const body: CreateInvoiceDto = {
      amount: 10,
      currency: 'PEN',
    } as CreateInvoiceDto;
    await expect(controller.completeTrip({ tripId: 1 }, body)).resolves.toEqual(
      mockApiResponseString,
    );
  });

  it('should create a trip', async () => {
    const dto: CreateTripDto = {
      driverId: 1,
      riderId: 1,
      startLatitude: -12.05,
      startLongitude: -77.03,
      endLatitude: -12.06,
      endLongitude: -77.04,
    } as CreateTripDto;
    await expect(controller.createTrip(dto)).resolves.toEqual(
      mockApiResponseTrip,
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TripApplicationService } from '../../../../src/modules/trips/application/services/trip.service';
import { TripDomainService } from '../../../../src/modules/trips/domain/services/trip.service';
import { DriverDomainService } from '../../../../src/modules/drivers/domain/services/driver.service';
import { InvoiceDomainService } from '../../../../src/modules/invoice/domain/services/invoice.service';
import { Trip } from '../../../../src/modules/trips/domain/entities/trip.entity';
import { DriverStatus } from '../../../../src/modules/drivers/domain/enums/driver-status.enum';
import { CreateTripDto } from '../../../../src/modules/trips/application/dto/create-trip.dto';
import { CreateInvoiceDto } from '../../../../src/modules/trips/application/dto/create-invoice.dto';
import { TripStatus } from '../../../../src/modules/trips/domain/enums/trip-status.enum';

describe('TripApplicationService', () => {
  let service: TripApplicationService;

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

  const tripDomainServiceMock = {
    getActiveTrips: jest.fn().mockResolvedValue([mockTrip]),
    getTripById: jest.fn().mockResolvedValue(mockTrip),
    completeTrip: jest.fn().mockResolvedValue(undefined),
    createTrip: jest.fn().mockResolvedValue(mockTrip),
  };

  const driverDomainServiceMock = {
    getDriverById: jest
      .fn()
      .mockResolvedValue({ driverId: 1, status: DriverStatus.Available }),
    updateDriverStatusById: jest.fn().mockResolvedValue(undefined),
  };

  const invoiceDomainServiceMock = {
    createInvoice: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripApplicationService,
        { provide: TripDomainService, useValue: tripDomainServiceMock },
        { provide: DriverDomainService, useValue: driverDomainServiceMock },
        { provide: InvoiceDomainService, useValue: invoiceDomainServiceMock },
      ],
    }).compile();

    service = module.get<TripApplicationService>(TripApplicationService);
  });

  it('should return active trips', async () => {
    await expect(service.getActiveTrips()).resolves.toEqual(
      mockApiResponseTrips,
    );
    expect(tripDomainServiceMock.getActiveTrips).toHaveBeenCalled();
  });

  it('should throw NotFoundException if no active trips', async () => {
    tripDomainServiceMock.getActiveTrips.mockResolvedValueOnce([]);
    await expect(service.getActiveTrips()).rejects.toThrow(
      'No active trips found',
    );
  });

  it('should complete a trip and create invoice', async () => {
    const body: CreateInvoiceDto = { amount: 10, currency: 'PEN' };
    await expect(service.completeTrip(1, body)).resolves.toEqual(
      mockApiResponseString,
    );
    expect(tripDomainServiceMock.getTripById).toHaveBeenCalledWith(1);
    expect(tripDomainServiceMock.completeTrip).toHaveBeenCalledWith(1);
    expect(driverDomainServiceMock.updateDriverStatusById).toHaveBeenCalledWith(
      1,
      DriverStatus.Available,
    );
    expect(invoiceDomainServiceMock.createInvoice).toHaveBeenCalledWith({
      tripId: 1,
      amount: 10,
      currency: 'PEN',
    });
  });

  it('should throw NotFoundException if trip not found (completeTrip)', async () => {
    const body: CreateInvoiceDto = { amount: 10, currency: 'PEN' };
    tripDomainServiceMock.getTripById.mockResolvedValueOnce(null);
    await expect(service.completeTrip(99, body)).rejects.toThrow(
      'Trip not found',
    );
  });

  it('should throw BadRequestException if trip is not active (completeTrip)', async () => {
    const body: CreateInvoiceDto = { amount: 10, currency: 'PEN' };
    tripDomainServiceMock.getTripById.mockResolvedValueOnce({
      ...mockTrip,
      status: TripStatus.Completed,
    });
    await expect(service.completeTrip(1, body)).rejects.toThrow(
      'Trip is not active',
    );
  });

  it('should create a trip and set driver busy', async () => {
    const dto: CreateTripDto = {
      driverId: 1,
      riderId: 1,
      startLatitude: -12.05,
      startLongitude: -77.03,
      endLatitude: -12.06,
      endLongitude: -77.04,
    };
    await expect(service.createTrip(dto)).resolves.toEqual(mockApiResponseTrip);
    expect(driverDomainServiceMock.getDriverById).toHaveBeenCalledWith(1);
    expect(tripDomainServiceMock.createTrip).toHaveBeenCalledWith(dto);
    expect(driverDomainServiceMock.updateDriverStatusById).toHaveBeenCalledWith(
      1,
      DriverStatus.Busy,
    );
  });

  it('should throw NotFoundException if driver not found (createTrip)', async () => {
    driverDomainServiceMock.getDriverById.mockResolvedValueOnce(null);
    const dto: CreateTripDto = {
      driverId: 99,
      riderId: 1,
      startLatitude: -12.05,
      startLongitude: -77.03,
      endLatitude: -12.06,
      endLongitude: -77.04,
    };
    await expect(service.createTrip(dto)).rejects.toThrow('Driver not found');
  });

  it('should throw BadRequestException if driver not available (createTrip)', async () => {
    driverDomainServiceMock.getDriverById.mockResolvedValueOnce({
      driverId: 1,
      status: DriverStatus.Busy,
    });
    const dto: CreateTripDto = {
      driverId: 1,
      riderId: 1,
      startLatitude: -12.05,
      startLongitude: -77.03,
      endLatitude: -12.06,
      endLongitude: -77.04,
    };
    await expect(service.createTrip(dto)).rejects.toThrow(
      'Driver is not available',
    );
  });
});

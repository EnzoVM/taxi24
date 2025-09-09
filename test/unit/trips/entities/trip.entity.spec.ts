import { Trip } from '../../../../src/modules/trips/domain/entities/trip.entity';
import { TripStatus } from '../../../../src/modules/trips/domain/enums/trip-status.enum';
import { Driver } from '../../../../src/modules/drivers/domain/entities/driver.entity';
import { Rider } from '../../../../src/modules/riders/domain/entities/rider.entity';

describe('Trip Entity', () => {
  it('should create a Trip instance with correct values', () => {
    const driver: Driver = { driverId: 1 } as Driver;
    const rider: Rider = { riderId: 2 } as Rider;
    const trip = new Trip();
    trip.tripId = 1;
    trip.driverId = 1;
    trip.riderId = 2;
    trip.driver = driver;
    trip.rider = rider;
    trip.startLatitude = -12.05;
    trip.startLongitude = -77.03;
    trip.endLatitude = -12.06;
    trip.endLongitude = -77.04;
    trip.status = TripStatus.Active;
    trip.isActive = true;
    trip.createdBy = 'SYSTEM';
    trip.createdAt = new Date('2023-01-01T00:00:00Z');
    trip.updatedBy = null;
    trip.updatedAt = null;

    expect(trip.tripId).toBe(1);
    expect(trip.driverId).toBe(1);
    expect(trip.riderId).toBe(2);
    expect(trip.driver).toBe(driver);
    expect(trip.rider).toBe(rider);
    expect(trip.startLatitude).toBe(-12.05);
    expect(trip.startLongitude).toBe(-77.03);
    expect(trip.endLatitude).toBe(-12.06);
    expect(trip.endLongitude).toBe(-77.04);
    expect(trip.status).toBe(TripStatus.Active);
    expect(trip.isActive).toBe(true);
    expect(trip.createdBy).toBe('SYSTEM');
    expect(trip.createdAt).toEqual(new Date('2023-01-01T00:00:00Z'));
    expect(trip.updatedBy).toBeNull();
    expect(trip.updatedAt).toBeNull();
  });

  it('should have default status as Active', () => {
    const trip = new Trip();
    expect(trip.status).toBeUndefined();
  });
});

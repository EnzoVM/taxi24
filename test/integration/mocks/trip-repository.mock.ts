import { Trip } from '../../../src/modules/trips/domain/entities/trip.entity';

export const mockCreateTrip: Trip = {
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

export const mockTrip: Trip = {
  tripId: 1,
  driverId: 1,
  riderId: 1,
  startLatitude: -12.05,
  startLongitude: -77.03,
  endLatitude: -12.06,
  endLongitude: -77.04,
  status: 1,
} as Trip;

export const tripRepositoryMock = {
  getActiveTrips: jest.fn().mockResolvedValue([mockTrip]),
  completeTrip: jest.fn().mockResolvedValue(undefined),
  createTrip: jest.fn().mockResolvedValue(mockCreateTrip),
  getTripById: jest.fn().mockResolvedValue(mockTrip),
};

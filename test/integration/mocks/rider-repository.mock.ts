import { Rider } from '../../../src/modules/riders/domain/entities/rider.entity';

export const mockRiders: Rider[] = [
  {
    riderId: 1,
    name: 'Carlos',
    lastname: 'Ramírez',
    latitude: -12.05,
    longitude: -77.03,
    isActive: true,
  } as Rider,
];

export const riderRepositoryMock = {
  getRiders: jest.fn().mockResolvedValue(mockRiders),
  getRiderById: jest.fn().mockResolvedValue(mockRiders[0]),
};

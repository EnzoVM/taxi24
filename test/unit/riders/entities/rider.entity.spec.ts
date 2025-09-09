import { Rider } from '../../../../src/modules/riders/domain/entities/rider.entity';

describe('Rider Entity', () => {
  it('should create a Rider instance with correct values', () => {
    const rider = new Rider();
    rider.riderId = 1;
    rider.name = 'Ana';
    rider.lastname = 'García Torres';
    rider.latitude = -12.05;
    rider.longitude = -77.03;
    rider.isActive = true;
    rider.createdBy = 'SYSTEM';
    rider.createdAt = new Date('2023-01-01T00:00:00Z');
    rider.updatedBy = null;
    rider.updatedAt = null;

    expect(rider.riderId).toBe(1);
    expect(rider.name).toBe('Ana');
    expect(rider.lastname).toBe('García Torres');
    expect(rider.latitude).toBe(-12.05);
    expect(rider.longitude).toBe(-77.03);
    expect(rider.isActive).toBe(true);
    expect(rider.createdBy).toBe('SYSTEM');
    expect(rider.createdAt).toEqual(new Date('2023-01-01T00:00:00Z'));
    expect(rider.updatedBy).toBeNull();
    expect(rider.updatedAt).toBeNull();
  });
});

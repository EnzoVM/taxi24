import { Driver } from '../../../../src/modules/drivers/domain/entities/driver.entity';

describe('Driver Entity', () => {
  it('should create a Driver instance with correct values', () => {
    const driver = new Driver();
    driver.driverId = 1;
    driver.name = 'Juan';
    driver.lastname = 'Pérez Gómez';
    driver.latitude = -12.0464;
    driver.longitude = -77.0428;
    driver.status = 1;
    driver.isActive = true;
    driver.createdBy = 'SYSTEM';
    driver.createdAt = new Date('2023-01-01T00:00:00Z');
    driver.updatedBy = null;
    driver.updatedAt = null;

    expect(driver.driverId).toBe(1);
    expect(driver.name).toBe('Juan');
    expect(driver.lastname).toBe('Pérez Gómez');
    expect(driver.latitude).toBe(-12.0464);
    expect(driver.longitude).toBe(-77.0428);
    expect(driver.status).toBe(1);
    expect(driver.isActive).toBe(true);
    expect(driver.createdBy).toBe('SYSTEM');
    expect(driver.createdAt).toEqual(new Date('2023-01-01T00:00:00Z'));
    expect(driver.updatedBy).toBeNull();
    expect(driver.updatedAt).toBeNull();
  });
});

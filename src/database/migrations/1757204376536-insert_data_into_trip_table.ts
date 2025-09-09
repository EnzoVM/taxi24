import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDataTripTable1757204376536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			INSERT INTO trip (driver_id, rider_id, start_latitude, start_longitude, end_latitude, end_longitude, status, is_active)
			VALUES
				(1, 1, -12.0468, -77.0375, -12.1196, -77.0290, 1, TRUE),
				(2, 2, -12.1150, -77.0305, -12.0891, -77.0498, 2, TRUE),
				(3, 3, -12.0935, -77.0280, -12.1296, -77.0295, 1, TRUE),
				(4, 4, -12.0280, -77.1100, -12.0761, -77.0802, 3, TRUE),
				(5, 5, -12.0610, -77.0420, -12.0665, -77.0332, 2, TRUE);
		`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			DELETE FROM trip WHERE driver_id IN (1, 2, 3, 4, 5) AND rider_id IN (1, 2, 3, 4, 5);
		`);
  }
}

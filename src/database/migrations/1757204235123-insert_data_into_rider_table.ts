import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDataRiderTable1757204235123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO rider (name, lastname, latitude, longitude, is_active)
      VALUES
        ('Andrea', 'Pérez Gómez', -12.0468, -77.0375, TRUE),
        ('Javier', 'García Torres', -12.1150, -77.0305, TRUE),
        ('Camila', 'Ramírez Díaz', -12.0935, -77.0280, TRUE),
        ('Diego', 'Torres Sánchez', -12.0280, -77.1100, TRUE),
        ('Paula', 'Sánchez Fernández', -12.0610, -77.0420, TRUE),
        ('Martín', 'Fernández Gómez', -12.1280, -77.0220, TRUE),
        ('Isabel', 'Gómez Martínez', -12.0885, -76.9690, TRUE),
        ('Esteban', 'Martínez Rojas', -12.0725, -77.0770, TRUE),
        ('Renata', 'Díaz Ramírez', -12.0925, -77.0470, TRUE),
        ('Gabriel', 'Rojas Torres', -12.0650, -77.0385, TRUE);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM rider WHERE lastname IN (
        'Pérez Gómez', 'García Torres', 'Ramírez Díaz', 'Torres Sánchez', 'Sánchez Fernández',
        'Fernández Gómez', 'Gómez Martínez', 'Martínez Rojas', 'Díaz Ramírez', 'Rojas Torres'
      );
    `);
  }
}

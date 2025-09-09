import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDataDriverTable1757203833404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO driver (name, lastname, latitude, longitude, status, is_active)
      VALUES
        ('Juan', 'Pérez Gómez', -12.0464, -77.0428, 2, TRUE),
        ('Ana', 'García Torres', -12.1196, -77.0290, 1, TRUE),
        ('Luis', 'Ramírez Díaz', -12.0931, -77.0339, 2, TRUE),
        ('María', 'Torres Sánchez', -12.0219, -77.1143, 1, TRUE),
        ('Carlos', 'Sánchez Fernández', -12.0575, -77.0414, 1, TRUE),
        ('Sofía', 'Fernández Gómez', -12.1296, -77.0295, 1, TRUE),
        ('Pedro', 'Gómez Martínez', -12.0840, -76.9717, 1, TRUE),
        ('Lucía', 'Martínez Rojas', -12.0761, -77.0802, 1, TRUE),
        ('Miguel', 'Díaz Ramírez', -12.0891, -77.0498, 1, TRUE),
        ('Valentina', 'Rojas Torres', -12.0665, -77.0332, 1, TRUE);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM driver WHERE lastname IN (
        'Pérez Gómez', 'García Torres', 'Ramírez Díaz', 'Torres Sánchez', 'Sánchez Fernández',
        'Fernández Gómez', 'Gómez Martínez', 'Martínez Rojas', 'Díaz Ramírez', 'Rojas Torres'
      );
    `);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDriverTable1757202068004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE driver (
        driver_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        lastname VARCHAR(100),
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        status INTEGER NOT NULL DEFAULT 1,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_by VARCHAR(100) NOT NULL DEFAULT 'SYSTEM',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_by VARCHAR(100),
        updated_at TIMESTAMP
      );
    `);
    await queryRunner.query(
      `COMMENT ON TABLE driver IS 'Tabla que almacena los conductores.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN driver.driver_id IS 'Identificador único del conductor.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN driver.name IS 'Nombre del conductor.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN driver.lastname IS 'Apellido del conductor.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN driver.latitude IS 'Latitud de ubicación actual del conductor.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN driver.longitude IS 'Longitud de ubicación actual del conductor.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN driver.status IS 'Estado del conductor (1: Disponible, 2: Ocupado, 3: Suspendido).';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN driver.is_active IS 'Indica si el conductor está habilitado.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN driver.created_by IS 'Usuario que creó el registro.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN driver.created_at IS 'Fecha de creación del registro.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN driver.updated_by IS 'Usuario que actualizó el registro.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN driver.updated_at IS 'Fecha de última actualización del registro.';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS driver;`);
  }
}

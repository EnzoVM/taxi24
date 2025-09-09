import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTripTable1757203460136 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE trip (
        trip_id SERIAL PRIMARY KEY,
        driver_id INTEGER NOT NULL REFERENCES driver(driver_id),
        rider_id INTEGER NOT NULL REFERENCES rider(rider_id),
        start_latitude DOUBLE PRECISION NOT NULL,
        start_longitude DOUBLE PRECISION NOT NULL,
        end_latitude DOUBLE PRECISION NOT NULL,
        end_longitude DOUBLE PRECISION NOT NULL,
        status INTEGER NOT NULL DEFAULT 1,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_by VARCHAR(100) NOT NULL DEFAULT 'SYSTEM',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_by VARCHAR(100),
        updated_at TIMESTAMP
      );
    `);
    await queryRunner.query(
      `COMMENT ON TABLE trip IS 'Tabla que almacena los viajes realizados.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN trip.trip_id IS 'Identificador único del viaje.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN trip.driver_id IS 'Identificador del conductor.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN trip.rider_id IS 'Identificador del pasajero.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN trip.start_latitude IS 'Latitud de inicio del viaje.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN trip.start_longitude IS 'Longitud de inicio del viaje.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN trip.end_latitude IS 'Latitud de destino del viaje.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN trip.end_longitude IS 'Longitud de destino del viaje.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN trip.status IS 'Estado del viaje (1: Activo, 2: Finalizado, 3: Cancelado).';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN trip.is_active IS 'Indica si el viaje está habilitado.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN trip.created_by IS 'Usuario que creó el registro.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN trip.created_at IS 'Fecha de creación del registro.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN trip.updated_by IS 'Usuario que actualizó el registro.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN trip.updated_at IS 'Fecha de última actualización del registro.';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS trip;`);
  }
}

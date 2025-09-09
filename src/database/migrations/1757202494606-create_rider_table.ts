import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRiderTable1757202494606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE rider (
        rider_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        lastname VARCHAR(100),
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_by VARCHAR(100) NOT NULL DEFAULT 'SYSTEM',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_by VARCHAR(100),
        updated_at TIMESTAMP
      );
    `);
    await queryRunner.query(
      `COMMENT ON TABLE rider IS 'Tabla que almacena los pasajeros.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN rider.rider_id IS 'Identificador único del pasajero.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN rider.name IS 'Nombre del pasajero.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN rider.lastname IS 'Apellido del pasajero.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN rider.latitude IS 'Latitud de ubicación actual del pasajero.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN rider.longitude IS 'Longitud de ubicación actual del pasajero.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN rider.is_active IS 'Indica si el pasajero está habilitado.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN rider.created_by IS 'Usuario que creó el registro.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN rider.created_at IS 'Fecha de creación del registro.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN rider.updated_by IS 'Usuario que actualizó el registro.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN rider.updated_at IS 'Fecha de última actualización del registro.';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS rider;`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInvoiceTable1757312303395 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE invoice (
        invoice_id SERIAL PRIMARY KEY,
        trip_id INTEGER NOT NULL REFERENCES trip(trip_id),
        amount NUMERIC(10,2) NOT NULL,
        currency CHAR(3) NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_by VARCHAR(100) NOT NULL DEFAULT 'SYSTEM',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_by VARCHAR(100),
        updated_at TIMESTAMP
      );
    `);

    await queryRunner.query(
      `COMMENT ON TABLE invoice IS 'Tabla de facturas generadas a partir de los viajes completados';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN invoice.invoice_id IS 'Identificador único de la factura';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN invoice.trip_id IS 'Identificador único del viaje.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN invoice.amount IS 'Monto total facturado';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN invoice.currency IS 'Código de moneda utilizado en la factura.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN invoice.is_active IS 'Indica si la factura está habilitada.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN invoice.created_by IS 'Usuario que creó el registro.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN invoice.created_at IS 'Fecha de creación del registro.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN invoice.updated_by IS 'Usuario que actualizó el registro.';`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN invoice.updated_at IS 'Fecha de última actualización del registro.';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS invoice;`);
  }
}

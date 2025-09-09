import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDataIntoInvoiceTable1757313873947
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO invoice (trip_id, amount, currency)
      VALUES
      (2, 25.50, 'PEN'),
      (5, 32.75, 'PEN');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM invoice WHERE trip_id IN (2, 5);
    `);
  }
}

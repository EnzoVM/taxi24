import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AuditEntity } from '../../../shared/entities/audit.entity';
import { DriverStatus } from '../enums/driver-status.enum';

@Entity('driver')
export class Driver extends AuditEntity {
  @PrimaryGeneratedColumn({ name: 'driver_id' })
  driverId: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  lastname: string | null;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @Column({ default: DriverStatus.Available })
  status: number;
}

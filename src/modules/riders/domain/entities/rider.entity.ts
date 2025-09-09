import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AuditEntity } from '../../../shared/entities/audit.entity';

@Entity('rider')
export class Rider extends AuditEntity {
  @PrimaryGeneratedColumn({ name: 'rider_id' })
  riderId: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  lastname: string | null;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AuditEntity } from '../../../shared/entities/audit.entity';
import { Trip } from '../../../trips/domain/entities/trip.entity';

@Entity('invoice')
export class Invoice extends AuditEntity {
  @PrimaryGeneratedColumn({ name: 'invoice_id' })
  invoiceId: number;

  @Column({ name: 'trip_id' })
  tripId: number;

  @ManyToOne(() => Trip)
  @JoinColumn({ name: 'trip_id' })
  trip: Trip;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'char', length: 3 })
  currency: string;
}

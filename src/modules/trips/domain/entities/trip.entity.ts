import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AuditEntity } from '../../../shared/entities/audit.entity';
import { TripStatus } from '../enums/trip-status.enum';
import { Driver } from '../../../drivers/domain/entities/driver.entity';
import { Rider } from '../../../riders/domain/entities/rider.entity';

@Entity('trip')
export class Trip extends AuditEntity {
  @PrimaryGeneratedColumn({ name: 'trip_id' })
  tripId: number;

  @Column({ name: 'driver_id' })
  driverId: number;

  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column({ name: 'rider_id' })
  riderId: number;

  @ManyToOne(() => Rider)
  @JoinColumn({ name: 'rider_id' })
  rider: Rider;

  @Column({ name: 'start_latitude', type: 'float' })
  startLatitude: number;

  @Column({ name: 'start_longitude', type: 'float' })
  startLongitude: number;

  @Column({ name: 'end_latitude', type: 'float' })
  endLatitude: number;

  @Column({ name: 'end_longitude', type: 'float' })
  endLongitude: number;

  @Column({ default: TripStatus.Active })
  status: number;
}

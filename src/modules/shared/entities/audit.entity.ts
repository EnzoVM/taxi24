import { Column } from 'typeorm';
import { IS_ACTIVE } from '../constants/app.constants';

export abstract class AuditEntity {
  @Column({ type: 'boolean', name: 'is_active', default: IS_ACTIVE })
  isActive: boolean;

  @Column({ type: 'varchar', name: 'created_by', default: 'SYSTEM' })
  createdBy: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ type: 'varchar', name: 'updated_by', nullable: true })
  updatedBy: string | null;

  @Column({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}

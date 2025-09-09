import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverApplicationService } from '../../application/services/driver.service';
import { DriverDomainService } from '../../domain/services/driver.service';
import { DriverRepository } from '../repositories/database/driver.database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../../domain/entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  controllers: [DriverController],
  providers: [
    DriverApplicationService,
    DriverDomainService,
    {
      provide: 'DriverInterfaceRepository',
      useClass: DriverRepository,
    },
  ],
})
export class DriverModule {}

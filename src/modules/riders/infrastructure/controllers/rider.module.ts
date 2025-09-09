import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderController } from './rider.controller';
import { RiderApplicationService } from '../../application/services/rider.service';
import { RiderDomainService } from '../../domain/services/rider.service';
import { RiderRepository } from '../repositories/database/rider.database';
import { Rider } from '../../domain/entities/rider.entity';
import { DriverDomainService } from '../../../drivers/domain/services/driver.service';
import { DriverRepository } from '../../../drivers/infrastructure/repositories/database/driver.database';
import { Driver } from '../../../drivers/domain/entities/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rider, Driver])],
  controllers: [RiderController],
  providers: [
    RiderApplicationService,
    RiderDomainService,
    DriverDomainService,
    {
      provide: 'RiderInterfaceRepository',
      useClass: RiderRepository,
    },
    {
      provide: 'DriverInterfaceRepository',
      useClass: DriverRepository,
    },
  ],
})
export class RiderModule {}

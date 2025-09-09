import { Controller, Get, Param } from '@nestjs/common';
import { RiderApplicationService } from '../../application/services/rider.service';
import { Rider } from '../../domain/entities/rider.entity';
import { Driver } from '../../../drivers/domain/entities/driver.entity';
import { ApiResponse } from '../../../shared/interfaces/response.interface';
import { GetRiderByIdDto } from '../../application/dto/get-rider-by-id.dto';
import { GetNearestDriversDto } from '../../application/dto/get-nearest-drivers.dto';

@Controller('v1/riders')
export class RiderController {
  constructor(
    private readonly riderApplicationService: RiderApplicationService,
  ) {}

  @Get()
  async getRiders(): Promise<ApiResponse<Rider[]>> {
    return await this.riderApplicationService.getRiders();
  }

  @Get(':riderId')
  async getRiderById(
    @Param() params: GetRiderByIdDto,
  ): Promise<ApiResponse<Rider>> {
    return await this.riderApplicationService.getRiderById(params.riderId);
  }

  @Get(':riderId/request-trip')
  async getNearestDrivers(
    @Param() params: GetNearestDriversDto,
  ): Promise<ApiResponse<Driver[]>> {
    return await this.riderApplicationService.getNearestDrivers(params.riderId);
  }
}

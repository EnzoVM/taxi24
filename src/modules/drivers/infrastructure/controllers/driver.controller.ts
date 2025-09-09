import { Controller, Get, Param, Query } from '@nestjs/common';
import { DriverApplicationService } from '../../application/services/driver.service';
import { Driver } from '../../domain/entities/driver.entity';
import { ApiResponse } from '../../../shared/interfaces/response.interface';
import { GetDriverByIdDto } from '../../application/dto/get-driver-by-id.dto';
import { GetAvailableDriversByRadiusDto } from '../../application/dto/get-available-driver-by-radius.dto';

@Controller('v1/drivers')
export class DriverController {
  constructor(
    private readonly driverApplicationService: DriverApplicationService,
  ) {}

  @Get()
  async getDrivers(): Promise<ApiResponse<Driver[]>> {
    return await this.driverApplicationService.getDrivers();
  }

  @Get('available')
  async getAvailableDrivers(): Promise<ApiResponse<Driver[]>> {
    return await this.driverApplicationService.getAvailableDrivers();
  }

  @Get(':driverId')
  async getDriverById(
    @Param() params: GetDriverByIdDto,
  ): Promise<ApiResponse<Driver>> {
    return await this.driverApplicationService.getDriverById(params.driverId);
  }

  @Get('available/radius')
  async getAvailableDriversByRadius(
    @Query() query: GetAvailableDriversByRadiusDto,
  ): Promise<ApiResponse<Driver[]>> {
    return await this.driverApplicationService.getAvailableDriversByRadius(
      query.latitude,
      query.longitude,
      query.radius,
    );
  }
}

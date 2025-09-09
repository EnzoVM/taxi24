import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TripApplicationService } from '../../application/services/trip.service';
import { ApiResponse } from '../../../shared/interfaces/response.interface';
import { Trip } from '../../domain/entities/trip.entity';
import { CreateTripDto } from '../../application/dto/create-trip.dto';
import { CreateInvoiceDto } from '../../application/dto/create-invoice.dto';
import { CompleteTripDto } from '../../application/dto/complete-trip.dto';

@Controller('v1/trips')
export class TripController {
  constructor(
    private readonly tripApplicationService: TripApplicationService,
  ) {}

  @Get('active')
  async getActiveTrips(): Promise<ApiResponse<Trip[]>> {
    return await this.tripApplicationService.getActiveTrips();
  }

  @Patch(':tripId/complete')
  async completeTrip(
    @Param() params: CompleteTripDto,
    @Body() body: CreateInvoiceDto,
  ): Promise<ApiResponse<string>> {
    return await this.tripApplicationService.completeTrip(params.tripId, body);
  }

  @Post()
  async createTrip(
    @Body() createTripDto: CreateTripDto,
  ): Promise<ApiResponse<Trip>> {
    return await this.tripApplicationService.createTrip(createTripDto);
  }
}

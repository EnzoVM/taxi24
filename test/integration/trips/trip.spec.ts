/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';
import {
  mockCreateTrip,
  mockTrip,
  tripRepositoryMock,
} from '../mocks/trip-repository.mock';
import { driverRepositoryMock } from '../mocks/driver-repository.mock';
import { invoiceRepositoryMock } from '../mocks/invoice-repository.mock';
import { CreateTripDto } from '../../../src/modules/trips/application/dto/create-trip.dto';

describe('TripController', () => {
  let app: INestApplication;
  let server: import('http').Server;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('TripInterfaceRepository')
      .useValue(tripRepositoryMock)
      .overrideProvider('DriverInterfaceRepository')
      .useValue(driverRepositoryMock)
      .overrideProvider('InvoiceInterfaceRepository')
      .useValue(invoiceRepositoryMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    server = app.getHttpServer() as unknown as import('http').Server;
  });

  it('GET /v1/trips/active should return active trips', async () => {
    const res: request.Response = await request(server).get('/v1/trips/active');

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(expect.arrayContaining([mockTrip]));
  });

  it('PATCH /v1/trips/:tripId/complete should complete a trip', async () => {
    const body = { amount: 10, currency: 'PEN' };

    const res: request.Response = await request(server)
      .patch('/v1/trips/1/complete')
      .send(body);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(tripRepositoryMock.completeTrip).toHaveBeenCalledWith(1);
  });

  it('POST /v1/trips should create a trip', async () => {
    const createTripDto = {
      driverId: 1,
      riderId: 1,
      startLatitude: -12.05,
      startLongitude: -77.03,
      endLatitude: -12.06,
      endLongitude: -77.04,
    } as CreateTripDto;

    const res: request.Response = await request(server)
      .post('/v1/trips')
      .send(createTripDto);

    expect(res.status).toBe(201);
    expect(res.body.data).toEqual(
      expect.objectContaining({
        ...mockCreateTrip,
        createdAt: mockCreateTrip.createdAt.toISOString(),
        updatedAt: mockCreateTrip.updatedAt
          ? mockCreateTrip.updatedAt.toISOString()
          : null,
      }),
    );
    expect(tripRepositoryMock.createTrip).toHaveBeenCalledWith(
      expect.objectContaining(createTripDto),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});

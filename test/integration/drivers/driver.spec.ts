/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';
import {
  driverRepositoryMock,
  mockDrivers,
} from '../mocks/driver-repository.mock';

describe('DriverController (integration - with mocks)', () => {
  let app: INestApplication;
  let server: import('http').Server;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('DriverInterfaceRepository')
      .useValue(driverRepositoryMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer() as unknown as import('http').Server;
  });

  it('GET /v1/drivers should return drivers', async () => {
    const res = await request(server).get('/v1/drivers');

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(expect.arrayContaining(mockDrivers));
  });

  it('GET /v1/drivers/available should return available drivers', async () => {
    const res = await request(server).get('/v1/drivers/available');

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(expect.arrayContaining(mockDrivers));
  });

  it('GET /v1/drivers/:driverId should return a driver', async () => {
    const res = await request(server).get('/v1/drivers/1');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(expect.objectContaining(mockDrivers[1]));
  });

  it('GET /v1/drivers/available/radius should return drivers by radius', async () => {
    const res = await request(server)
      .get('/v1/drivers/available/radius')
      .query({ latitude: '-12.05', longitude: '-77.03', radius: '5' });
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(expect.arrayContaining(mockDrivers));
  });

  afterAll(async () => {
    await app.close();
  });
});

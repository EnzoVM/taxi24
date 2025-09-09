/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';
import {
  mockRiders,
  riderRepositoryMock,
} from '../mocks/rider-repository.mock';
import { driverRepositoryMock } from '../mocks/driver-repository.mock';

describe('RiderController)', () => {
  let app: INestApplication;
  let server: import('http').Server;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('RiderInterfaceRepository')
      .useValue(riderRepositoryMock)
      .overrideProvider('DriverInterfaceRepository')
      .useValue(driverRepositoryMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    server = app.getHttpServer() as unknown as import('http').Server;
  });

  it('GET /v1/riders should return riders', async () => {
    const res = await request(server).get('/v1/riders');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(expect.arrayContaining(mockRiders));
  });

  it('GET /v1/riders/:riderId should return a rider', async () => {
    const res = await request(server).get('/v1/riders/1');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(expect.objectContaining(mockRiders[0]));
  });

  afterAll(async () => {
    await app.close();
  });
});

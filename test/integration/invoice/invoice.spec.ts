/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';
import {
  mockInvoice,
  invoiceRepositoryMock,
  mockCreateInvoice,
} from '../mocks/invoice-repository.mock';
import { tripRepositoryMock } from '../mocks/trip-repository.mock';

describe('InvoiceController', () => {
  let app: INestApplication;
  let server: import('http').Server;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('InvoiceInterfaceRepository')
      .useValue(invoiceRepositoryMock)
      .overrideProvider('TripInterfaceRepository')
      .useValue(tripRepositoryMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    server = app.getHttpServer() as unknown as import('http').Server;
  });

  it('GET /v1/invoices should return invoices', async () => {
    const res = await request(server).get('/v1/invoices');

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(
      expect.arrayContaining([
        {
          ...mockInvoice,
          trip: {
            ...mockInvoice.trip,
            createdAt: mockInvoice.trip.createdAt.toISOString(),
            updatedAt: mockInvoice.trip.updatedAt
              ? mockInvoice.trip.updatedAt.toISOString()
              : null,
          },
        },
      ]),
    );
  });

  it('POST /v1/invoices should create an invoice', async () => {
    const createInvoiceDto = {
      tripId: 1,
      amount: 100,
      currency: 'PEN',
    };

    const res = await request(server)
      .post('/v1/invoices')
      .send(createInvoiceDto);

    expect(res.status).toBe(201);
    expect(res.body.data).toEqual(
      expect.objectContaining({
        ...mockCreateInvoice,
        createdAt: mockCreateInvoice.createdAt.toISOString(),
        updatedAt: mockCreateInvoice.updatedAt
          ? mockCreateInvoice.updatedAt.toISOString()
          : null,
      }),
    );
    expect(invoiceRepositoryMock.createInvoice).toHaveBeenCalledWith(
      expect.objectContaining(createInvoiceDto),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});

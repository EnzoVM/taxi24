import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: String(process.env.DATABASE_HOST),
  port: Number(process.env.DATABASE_PORT),
  username: String(process.env.DATABASE_USER),
  password: String(process.env.DATABASE_PASSWORD),
  database: String(process.env.DATABASE_NAME),
  entities: [__dirname + '/../modules/**/domain/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
  synchronize: false,
};

export const AppDataSource = new DataSource(dbConfig);

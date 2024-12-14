import { DataSource } from 'typeorm';
import { Form } from './entities/Form';
import { FormSubmission } from './entities/FormSubmission';
import { User } from './entities/User';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'formbuilder',
  synchronize: !isProduction, // Only synchronize in development
  logging: !isProduction,
  entities: [Form, FormSubmission, User],
  subscribers: [],
  migrations: [],
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  extra: {
    max: 20,
    connectionTimeoutMillis: 5000,
  }
});

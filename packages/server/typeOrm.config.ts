import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Migrations1683547508580 } from './migrations/1683547508580-migrations';
import { EnvironmentVariables } from './src/types';

config();

const configService = new ConfigService<EnvironmentVariables>();

export default new DataSource({
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [Migrations1683547508580],
  logging: 'all',
  logNotifications: true,
  migrationsRun: true,
});

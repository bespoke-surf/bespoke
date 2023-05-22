import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Migrations1684427301725 } from './migrations/1684427301725-migrations';
import { Migrations1684584388289 } from './migrations/1684584388289-migrations';
import { EnvironmentVariables } from './src/types';

config();

const configService = new ConfigService<EnvironmentVariables>();

export default new DataSource({
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [Migrations1684427301725, Migrations1684584388289],
  logging: 'all',
  logNotifications: true,
  migrationsRun: true,
});

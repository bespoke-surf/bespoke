import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Init1688216057842 } from './migrations/1688216057842-Init';
import { EnvironmentVariables } from './src/types';

config();

const configService = new ConfigService<EnvironmentVariables>();

export default new DataSource({
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [Init1688216057842],
  logging: 'all',
  logNotifications: true,
  migrationsRun: true,
});

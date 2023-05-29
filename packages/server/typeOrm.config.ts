import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Migrations1684427301725 } from './migrations/1684427301725-migrations';
import { Migrations1684584388289 } from './migrations/1684584388289-migrations';
import { Migrations1685179383693 } from './migrations/1685179383693-migrations';
import { Migrations1685184841744 } from './migrations/1685184841744-migrations';
import { Migrations1685186715544 } from './migrations/1685186715544-migrations';
import { EnvironmentVariables } from './src/types';

config();

const configService = new ConfigService<EnvironmentVariables>();

export default new DataSource({
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [
    Migrations1684427301725,
    Migrations1684584388289,
    Migrations1685179383693,
    Migrations1685184841744,
    Migrations1685186715544,
  ],
  logging: 'all',
  logNotifications: true,
  migrationsRun: true,
});

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1685179383693 implements MigrationInterface {
  name = 'Migrations1685179383693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item" ALTER COLUMN "start_date" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ALTER COLUMN "end_date" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item" ALTER COLUMN "end_date" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ALTER COLUMN "start_date" SET NOT NULL`,
    );
  }
}

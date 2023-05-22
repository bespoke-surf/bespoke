import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1684584388289 implements MigrationInterface {
  name = 'Migrations1684584388289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "billing" DROP COLUMN "contactsQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "billing" DROP COLUMN "emailSendQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "billing" ADD "bespokePlanId" character varying NOT NULL DEFAULT 'FREE'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "billing" DROP COLUMN "bespokePlanId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "billing" ADD "emailSendQuantity" integer NOT NULL DEFAULT '6000'`,
    );
    await queryRunner.query(
      `ALTER TABLE "billing" ADD "contactsQuantity" integer NOT NULL DEFAULT '2000'`,
    );
  }
}

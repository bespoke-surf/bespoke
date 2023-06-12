import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1686446395750 implements MigrationInterface {
  name = 'Migrations1686446395750';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "accessLevel"`);
    await queryRunner.query(`DROP TYPE "public"."api_key_accesslevel_enum"`);
    await queryRunner.query(
      `CREATE TYPE "public"."api_key_accesslevel_enum" AS ENUM('read', 'custom', 'full')`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ADD "accessLevel" "public"."api_key_accesslevel_enum" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "accessLevel"`);
    await queryRunner.query(
      `CREATE TYPE "public"."api_key_accesslevel_enum" AS ENUM('read', 'custom', 'full')`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ADD "accessLevel" "public"."api_key_accesslevel_enum" array NOT NULL`,
    );
  }
}

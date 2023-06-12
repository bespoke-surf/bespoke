import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1685924820793 implements MigrationInterface {
  name = 'Migrations1685924820793';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."api_key_scopes_enum" AS ENUM('list:read', 'list:manage')`,
    );
    await queryRunner.query(
      `CREATE TABLE "api_key" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "secretHash" character varying NOT NULL, "scopes" "public"."api_key_scopes_enum" array NOT NULL DEFAULT '{list:manage}', "storeId" uuid NOT NULL, CONSTRAINT "PK_b1bd840641b8acbaad89c3d8d11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ADD CONSTRAINT "FK_adfff8b3312798d6db2038a474f" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "api_key" DROP CONSTRAINT "FK_adfff8b3312798d6db2038a474f"`,
    );
    await queryRunner.query(`DROP TABLE "api_key"`);
    await queryRunner.query(`DROP TYPE "public"."api_key_scopes_enum"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1686443589817 implements MigrationInterface {
  name = 'Migrations1686443589817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "secretHash"`);
    await queryRunner.query(
      `ALTER TABLE "api_key" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ADD "key" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ADD "lastUsed" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."api_key_accesslevel_enum" AS ENUM('read', 'custom', 'full')`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ADD "accessLevel" "public"."api_key_accesslevel_enum" array NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."api_key_scopes_enum" RENAME TO "api_key_scopes_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."api_key_scopes_enum" AS ENUM('list:read', 'list:manage', 'subscriber:read', 'subscriber:manage')`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "scopes" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "scopes" TYPE "public"."api_key_scopes_enum"[] USING "scopes"::"text"::"public"."api_key_scopes_enum"[]`,
    );
    await queryRunner.query(`DROP TYPE "public"."api_key_scopes_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."api_key_scopes_enum_old" AS ENUM('list:read', 'list:manage')`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "scopes" TYPE "public"."api_key_scopes_enum_old"[] USING "scopes"::"text"::"public"."api_key_scopes_enum_old"[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "api_key" ALTER COLUMN "scopes" SET DEFAULT '{list:manage}'`,
    );
    await queryRunner.query(`DROP TYPE "public"."api_key_scopes_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."api_key_scopes_enum_old" RENAME TO "api_key_scopes_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "accessLevel"`);
    await queryRunner.query(`DROP TYPE "public"."api_key_accesslevel_enum"`);
    await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "lastUsed"`);
    await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "key"`);
    await queryRunner.query(`ALTER TABLE "api_key" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "api_key" ADD "secretHash" character varying NOT NULL`,
    );
  }
}

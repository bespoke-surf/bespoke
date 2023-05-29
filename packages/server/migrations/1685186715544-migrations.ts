import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1685186715544 implements MigrationInterface {
  name = 'Migrations1685186715544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."item_category_type_enum" RENAME TO "item_category_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."item_category_type_enum" AS ENUM('FREE', 'SUBSCRIPTION', 'SHOP')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_category" ALTER COLUMN "type" TYPE "public"."item_category_type_enum" USING "type"::"text"::"public"."item_category_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."item_category_type_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."item_category_type_enum_old" AS ENUM('SUBSCRIPTION', 'SHOP')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_category" ALTER COLUMN "type" TYPE "public"."item_category_type_enum_old" USING "type"::"text"::"public"."item_category_type_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."item_category_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."item_category_type_enum_old" RENAME TO "item_category_type_enum"`,
    );
  }
}

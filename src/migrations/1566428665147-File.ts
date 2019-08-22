import {MigrationInterface, QueryRunner} from "typeorm";

export class File1566428665147 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE "file" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" text NOT NULL,
                "article_id" integer
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_file" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" text NOT NULL,
                "article_id" integer,
                CONSTRAINT "FK_de52f72e6e97ff8504d6d6de5a4"
                    FOREIGN KEY ("article_id") REFERENCES "article" ("id")
                    ON DELETE CASCADE ON UPDATE CASCADE
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_file"(
                "id",
                "name",
                "article_id"
            ) SELECT "id", "name", "article_id" FROM "file"
        `);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`ALTER TABLE "temporary_file" RENAME TO "file"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            ALTER TABLE "file" RENAME TO "temporary_file"
        `);
        await queryRunner.query(`
            CREATE TABLE "file" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" text NOT NULL,
                "article_id" integer
            )
        `);
        await queryRunner.query(`
            INSERT INTO "file"(
                "id",
                "name",
                "article_id"
            ) SELECT "id", "name", "article_id" FROM "temporary_file"
        `);
        await queryRunner.query(`DROP TABLE "temporary_file"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }
}

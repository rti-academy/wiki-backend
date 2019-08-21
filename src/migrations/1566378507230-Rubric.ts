import {MigrationInterface, QueryRunner} from "typeorm";

export class Rubric1566378507230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_article" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "parent_id" integer NOT NULL, "version" integer NOT NULL, "creation_time" varchar NOT NULL, "update_time" varchar NOT NULL, "type" varchar NOT NULL DEFAULT ('note'))`);
        await queryRunner.query(`INSERT INTO "temporary_article"("id", "title", "content", "parent_id", "version", "creation_time", "update_time") SELECT "id", "title", "content", "parent_id", "version", "creation_time", "update_time" FROM "article"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`ALTER TABLE "temporary_article" RENAME TO "article"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "article" RENAME TO "temporary_article"`);
        await queryRunner.query(`CREATE TABLE "article" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "parent_id" integer NOT NULL, "version" integer NOT NULL, "creation_time" varchar NOT NULL, "update_time" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "article"("id", "title", "content", "parent_id", "version", "creation_time", "update_time") SELECT "id", "title", "content", "parent_id", "version", "creation_time", "update_time" FROM "temporary_article"`);
        await queryRunner.query(`DROP TABLE "temporary_article"`);
    }

}

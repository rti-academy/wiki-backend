import {MigrationInterface, QueryRunner} from "typeorm";

export class Tag1566378166314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "article_tags_tag" ("articleId" integer NOT NULL, "tagId" integer NOT NULL, PRIMARY KEY ("articleId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9b7dd28292e2799512cd70bfd8" ON "article_tags_tag" ("articleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5fee2a10f8d6688bd2f2c50f15" ON "article_tags_tag" ("tagId") `);
        await queryRunner.query(`DROP INDEX "IDX_9b7dd28292e2799512cd70bfd8"`);
        await queryRunner.query(`DROP INDEX "IDX_5fee2a10f8d6688bd2f2c50f15"`);
        await queryRunner.query(`CREATE TABLE "temporary_article_tags_tag" ("articleId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "FK_9b7dd28292e2799512cd70bfd81" FOREIGN KEY ("articleId") REFERENCES "article" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_5fee2a10f8d6688bd2f2c50f15e" FOREIGN KEY ("tagId") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("articleId", "tagId"))`);
        await queryRunner.query(`INSERT INTO "temporary_article_tags_tag"("articleId", "tagId") SELECT "articleId", "tagId" FROM "article_tags_tag"`);
        await queryRunner.query(`DROP TABLE "article_tags_tag"`);
        await queryRunner.query(`ALTER TABLE "temporary_article_tags_tag" RENAME TO "article_tags_tag"`);
        await queryRunner.query(`CREATE INDEX "IDX_9b7dd28292e2799512cd70bfd8" ON "article_tags_tag" ("articleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5fee2a10f8d6688bd2f2c50f15" ON "article_tags_tag" ("tagId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_5fee2a10f8d6688bd2f2c50f15"`);
        await queryRunner.query(`DROP INDEX "IDX_9b7dd28292e2799512cd70bfd8"`);
        await queryRunner.query(`ALTER TABLE "article_tags_tag" RENAME TO "temporary_article_tags_tag"`);
        await queryRunner.query(`CREATE TABLE "article_tags_tag" ("articleId" integer NOT NULL, "tagId" integer NOT NULL, PRIMARY KEY ("articleId", "tagId"))`);
        await queryRunner.query(`INSERT INTO "article_tags_tag"("articleId", "tagId") SELECT "articleId", "tagId" FROM "temporary_article_tags_tag"`);
        await queryRunner.query(`DROP TABLE "temporary_article_tags_tag"`);
        await queryRunner.query(`CREATE INDEX "IDX_5fee2a10f8d6688bd2f2c50f15" ON "article_tags_tag" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9b7dd28292e2799512cd70bfd8" ON "article_tags_tag" ("articleId") `);
        await queryRunner.query(`DROP INDEX "IDX_5fee2a10f8d6688bd2f2c50f15"`);
        await queryRunner.query(`DROP INDEX "IDX_9b7dd28292e2799512cd70bfd8"`);
        await queryRunner.query(`DROP TABLE "article_tags_tag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}

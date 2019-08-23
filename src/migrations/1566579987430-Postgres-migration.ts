import {MigrationInterface, QueryRunner} from "typeorm";

export class PostgresMigration1566579987430 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "original_name" character varying NOT NULL DEFAULT 'name', "article_id" integer, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'note', "content" character varying NOT NULL, "parent_id" integer NOT NULL, "version" integer NOT NULL, "creation_time" character varying NOT NULL, "update_time" character varying NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "article_id" integer NOT NULL, "publish_date" character varying NOT NULL, "text" character varying NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article_tags_tag" ("articleId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_25290137c7f85b582eea2bc470d" PRIMARY KEY ("articleId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9b7dd28292e2799512cd70bfd8" ON "article_tags_tag" ("articleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5fee2a10f8d6688bd2f2c50f15" ON "article_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_de52f72e6e97ff8504d6d6de5a4" FOREIGN KEY ("article_id") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article_tags_tag" ADD CONSTRAINT "FK_9b7dd28292e2799512cd70bfd81" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_tags_tag" ADD CONSTRAINT "FK_5fee2a10f8d6688bd2f2c50f15e" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "article_tags_tag" DROP CONSTRAINT "FK_5fee2a10f8d6688bd2f2c50f15e"`);
        await queryRunner.query(`ALTER TABLE "article_tags_tag" DROP CONSTRAINT "FK_9b7dd28292e2799512cd70bfd81"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_de52f72e6e97ff8504d6d6de5a4"`);
        await queryRunner.query(`DROP INDEX "IDX_5fee2a10f8d6688bd2f2c50f15"`);
        await queryRunner.query(`DROP INDEX "IDX_9b7dd28292e2799512cd70bfd8"`);
        await queryRunner.query(`DROP TABLE "article_tags_tag"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }
}

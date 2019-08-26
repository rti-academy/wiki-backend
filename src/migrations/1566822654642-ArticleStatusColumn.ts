import {MigrationInterface, QueryRunner} from "typeorm";

export class ArticleStatusColumn1566822654642 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "article" ADD "status" character varying NOT NULL DEFAULT 'draft'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "status"`);
    }

}

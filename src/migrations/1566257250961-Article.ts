import { MigrationInterface, QueryRunner } from 'typeorm';

export class Article1566257250961 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE article (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                parent_id INTEGER NOT NULL,
                version INTEGER NOT NULL,
                creation_time TEXT NOT NULL,
                update_time TEXT NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            DROP TABLE article;
        `);
    }

}

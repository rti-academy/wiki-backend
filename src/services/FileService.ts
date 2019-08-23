import * as fs from 'fs';
import * as path from 'path';
import { getRepository } from 'typeorm';

import { File } from '../entities/File';
import { Article } from '../entities/Article';

const UPLOADS_PATH = path.resolve(__dirname, '../..', 'uploads');

export class FileService {

    public async create(name: string, articleId: number): Promise<File> {
        const article = await getRepository(Article).findOneOrFail(articleId);
        return getRepository(File).save({
            name,
            article: article
        });
    }

    public async delete(id: number): Promise<void> {
        const { name } = await getRepository(File).findOneOrFail(id);

        await getRepository(File).delete(id);

        fs.unlink(`${UPLOADS_PATH}/${name}`, err => {
            if (err) {
                console.log(`Can't delete ${name}`);
            }
        });
    }

    public async get(id: number): Promise<File> {
        return getRepository(File).findOneOrFail(id);
    }

    public async getByArticle(articleId: number): Promise<File[]> {
        return getRepository(File).find({
            where: { articleId }
        });
    }

}

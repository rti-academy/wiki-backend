import * as fs from 'fs';
import { getRepository } from 'typeorm';

import { File } from '../entities/File';
import { Article } from '../entities/Article';

interface CreateParams {
    articleId: number;
    name: string;
    originalName: string;
}

export class FileService {

    public async create({
        articleId,
        name,
        originalName = name
    }: CreateParams): Promise<File> {
        const article = await getRepository(Article).findOneOrFail(articleId);
        return getRepository(File).save({
            name,
            originalName,
            article
        });
    }

    public async delete(id: number): Promise<void> {
        const file = await getRepository(File).findOneOrFail(id);

        await getRepository(File).delete(id);

        fs.unlink(file.getPath(), err => {
            if (err) {
                console.log(`Can't delete file ${file.name}`);
            }
        });
    }

    public async get(id: number): Promise<File> {
        return getRepository(File).findOneOrFail(id);
    }

    public async getByArticle(articleId: number): Promise<File[]> {
        const article = await getRepository(Article).findOneOrFail(articleId);
        return getRepository(File).find({
            where: { article }
        });
    }

}

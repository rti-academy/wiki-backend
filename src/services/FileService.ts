import { getRepository } from 'typeorm';
import { File } from '../entities/File';
import { Article } from '../entities/Article';

export class FileService {

    public async create(name: string, articleId: number): Promise<File> {
        const article = await getRepository(Article).findOneOrFail(articleId);
        return getRepository(File).save({
            name,
            article: article
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

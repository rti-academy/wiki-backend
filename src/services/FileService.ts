import { getRepository } from 'typeorm';
import { File } from '../entities/File';
import { Article } from '../entities/Article';

export class FileService {
    public async create(name: string, articleId: number): Promise<File> {
        const article = await getRepository(Article).findOne(articleId);
        return getRepository(File).save({
            name,
            article: article
        });
    }
}

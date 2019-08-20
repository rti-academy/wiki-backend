import { getRepository, getConnection } from 'typeorm';

import { Article } from '../entities/Article';
import { CreateArticleBody } from '../requests/CreateArticleBody';
import { UpdateArticleBody } from '../requests/UpdateArticleBody';
import { ArticleData } from '../responses/ArticleData';

export class ArticleService {

    public async create(data: CreateArticleBody): Promise<number> {
        const time = new Date();

        const { id } = await getRepository(Article).save({
            ...data,
            version: 1,
            creationTime: time.toISOString(),
            updateTime: time.toISOString(),
        });

        return id;
    }

    public async update(id: number, data: UpdateArticleBody): Promise<void> {
        getRepository(Article).findOneOrFail(id);

        const time = new Date();

        await getConnection()
            .createQueryBuilder()
            .update(Article)
            .set({
                ...data,
                version: () => 'version + 1',
                updateTime: time.toISOString(),
            })
            .where('id = :id', { id })
            .execute();
    }

    public async delete(id: number) {
        await getRepository(Article).findOneOrFail(id);
        await getRepository(Article).delete(id);
    }

    public async get(id: number): Promise<ArticleData> {
        return getRepository(Article).findOneOrFail(id);
    }

    public async find(): Promise<ArticleData[]> {
        return getRepository(Article).find();
    }

}

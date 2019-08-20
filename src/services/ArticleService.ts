import { getRepository, getConnection } from 'typeorm';

import { Article } from '../entities/Article';
import { CreateArticleBody } from '../requests/CreateArticleBody';
import { UpdateArticleBody } from '../requests/UpdateArticleBody';

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

    public async get(id: number): Promise<Article> {
        return getRepository(Article).findOneOrFail(id);
    }

    public async search(query?: string): Promise<Article[]> {
        return query
            ? this.getByQuery(query)
            : this.getAll();
    }

    private async getAll(): Promise<Article[]> {
        return getRepository(Article).find();
    }

    private async getByQuery(query: string): Promise<Article[]> {
        const queryBuilder = getRepository(Article).createQueryBuilder();

        query.toLowerCase().split(' ').forEach((item, index) => {
            const name = `item_${index}`;
            const value = `%${item}%`;

            queryBuilder
                .orWhere(`lower(title) like :${name}`, { [name]: value })
                .orWhere(`lower(content) like :${name}`, { [name]: value });
        });

        return queryBuilder.getMany();
    }

}

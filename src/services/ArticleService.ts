import { getRepository, getConnection } from 'typeorm';

import { SearchArticleQueryBuilder } from './SearchArticleQueryBuilder';
import { Article, NodeType } from '../entities/Article';

import { CreateArticleBody } from '../requests/CreateArticleBody';
import { UpdateArticleBody } from '../requests/UpdateArticleBody';
import { SearchArticleQuery } from '../requests/SearchArticleQuery';

import { NodeData } from '../responses/NodeData';

export class ArticleService {

    public async create({
        type = NodeType.Note,
        content = '',
        ...data
    }: CreateArticleBody): Promise<number> {
        const time = new Date();

        if (data.parentId) {
            getRepository(Article).findOneOrFail(data.parentId);
        }

        const { id } = await getRepository(Article).save({
            ...data,
            type,
            content,
            version: 1,
            creationTime: time.toISOString(),
            updateTime: time.toISOString(),
        });

        return id;
    }

    public async update(id: number, data: UpdateArticleBody): Promise<void> {
        getRepository(Article).findOneOrFail(id);

        if (data.parentId) {
            getRepository(Article).findOneOrFail(data.parentId);
        }

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

    public async search({ query, type }: SearchArticleQuery): Promise<NodeData[]> {
        const queryBuilder = new SearchArticleQueryBuilder();

        if (query) {
            queryBuilder.buildSearchQuery(query);
        }

        if (type) {
            queryBuilder.buildTypeFilter(type)
        }

        return queryBuilder.getMany();
    }

}

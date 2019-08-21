import { getRepository, SelectQueryBuilder, Brackets } from 'typeorm';

import { Article, NodeType } from '../entities/Article';
import { NodeData } from '../responses/NodeData';

export class SearchArticleQueryBuilder {

    private queryBuilder: SelectQueryBuilder<Article>;

    constructor() {
        this.queryBuilder = getRepository(Article)
            .createQueryBuilder('article')
            .select(['article.id', 'article.title', 'article.type', 'article.parentId']);
    }

    public buildSearchQuery(query: string): SearchArticleQueryBuilder {
        this.queryBuilder.andWhere(new Brackets(qb => {
            const tokens = query.toLowerCase().split(' ');

            tokens.forEach((item, index) => {
                const name = `item_${index}`;
                const value = `%${item}%`;

                qb.orWhere(`lower(title) like :${name}`, { [name]: value })
                    .orWhere(`lower(content) like :${name}`, { [name]: value });
            });
        }));

        return this;
    }

    public buildTypeFilter(type: NodeType): SearchArticleQueryBuilder {
        this.queryBuilder.andWhere('type = :type', { type });

        return this;
    }

    public async getMany(): Promise<NodeData[]> {
        console.log(this.queryBuilder.getQuery(), this.queryBuilder.getParameters());
        return this.queryBuilder.getMany();
    }

}

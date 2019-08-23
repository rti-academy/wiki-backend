import { getRepository } from 'typeorm';
import { Tag } from '../entities/Tag';
import { Article } from '../entities/Article';
import { AddTagBody } from '../requests/AddTagBody';

export class TagService {

    public async addTagToArticle(articleId: number, data: AddTagBody): Promise<number> {
        const tagRepository = getRepository(Tag);
        const articleRepository = getRepository(Article);

        const value = data.value.toLowerCase();

        let tag = await tagRepository
                        .createQueryBuilder()
                        .where('lower(value) = :value', { value })
                        .getOne();

        if (!tag) {
            tag = await tagRepository.save({
                ...data,
            });
        }

        const article = await this.getArticleWithTags(articleId);

        if (article.tags.findIndex(t => t.id === tag.id) < 0) {
            article.tags.push(tag);
            await articleRepository.save(article);
        }

        return tag.id;
    }

    public async getTagsByArticle(articleId: number): Promise<Tag[]> {
        const article = await this.getArticleWithTags(articleId);
        return article.tags;
    }

    public async deleteTagFromArticle(articleId: number, tagId: number) {
        await getRepository(Tag).findOneOrFail(tagId);

        const article = await this.getArticleWithTags(articleId);

        const tagIndex = article.tags.findIndex(t => t.id === tagId);

        if (tagIndex >= 0) {
            article.tags.splice(tagIndex, 1);
            getRepository(Article).save(article);
        }
    }

    public async search(query?: string): Promise<Tag[]> {
        return query
                ? this.getByQuery(query)
                : this.getAll();

    }

    private async getAll(): Promise<Tag[]> {
        return getRepository(Tag).find();
    }

    private async getByQuery(query: string): Promise<Tag[]> {
        const queryBuilder = getRepository(Tag).createQueryBuilder();

        query.toLowerCase().split(' ').forEach((item, index) => {
            const name = `item_${index}`;
            const value = `%${item}%`;

            queryBuilder
                .orWhere(`value ilike :${name}`, { [name]: value });
        });

        return queryBuilder.getMany();
    }

    private async getArticleWithTags(articleId: number): Promise<Article> {
        const articleRepository = getRepository(Article);
        const article = await articleRepository
                            .createQueryBuilder('article')
                            .leftJoinAndSelect('article.tags', 'tag')
                            .where('article.id = :articleId', { articleId })
                            .getOne();

        if (!article) {
            throw new Error('Article not found.');
        }

        return article;
    }
}

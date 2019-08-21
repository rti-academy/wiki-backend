import { JsonController, Post, Delete, Get, BodyParam, QueryParam, Param, HttpCode, OnUndefined } from 'routing-controllers';

import { AddTagBody } from '../requests/AddTagBody';
import { TagListResponse } from '../responses/TagListResponse';
import { TagService } from '../services/TagService';

@JsonController()
export class TagController {

    private tagService: TagService = new TagService();

    /**
     * @api {POST} /api/article/:id/tag Добавить тег к статье
     * @apiName addToArticle
     * @apiGroup tag
     *
     * @apiParam (Route params) {number} id
     *
     * @apiUse AddTagBody
     *
     * @apiSuccess (Success 201) Created Successfully created
     *
     * @apiExample {curl} Пример:
     *   curl -v -H "Content-Type: application/json" -d '{"tag":{"value":"Some text"}}' http://127.0.0.1:3000/api/article/1/tag
     */
    @Post('/article/:id/tag')
    @HttpCode(201)
    public async addToArticle(
        @Param('id') aticleId: number,
        @BodyParam('tag', { required: true }) body: AddTagBody,
    ): Promise<{ id: number }> {
        const id = await this.tagService.addTagToArticle(aticleId, body);
        return { id };
    }

    /**
     * @api {DELETE} /api/article/:id/tag/:tagId Удалить тег из статьи
     * @apiName removeFromArticle
     * @apiGroup tag
     *
     * @apiParam (Route params) {number} id
     * @apiParam (Route params) {number} tagId
     *
     * @apiSuccess (Success 204) NoContent Successfully deleted
     *
     * @apiError (Not Found 404) NotFoundError <code>id</code> was not found
     *
     * @apiExample {curl} Пример:
     *   curl -v -X DELETE http://127.0.0.1:3000/api/article/1/tag/1
     */
    @Delete('/article/:id/tag/:tagId')
    @OnUndefined(204)
    public async removeFromArticle(
        @Param('id') articleId: number,
        @Param('tagId') tagId: number,
    ): Promise<void> {
        await this.tagService.deleteTagFromArticle(articleId, tagId);
    }

    /**
     * @api {GET} /api/article/:id/tag Получить теги статьи
     * @apiName getByArticle
     * @apiGroup tag
     *
     * @apiParam (Route params) {number} id
     *
     * @apiUse TagListResponse
     *
     * @apiExample {curl} Пример:
     *   curl -v http://127.0.0.1:3000/api/article/1/tag
     */
    @Get('/article/:id/tag')
    public async getByArticle(
        @Param('id') articleId: number,
    ): Promise<TagListResponse> {
        const tags = await this.tagService.getTagsByArticle(articleId);
        return { tags };
    }

    /**
     * @api {GET} /api/tag Найти теги
     * @apiName search
     * @apiGroup tag
     *
     * @apiParam (Query params) {string} [query]
     *
     * @apiUse TagListResponse
     *
     * @apiExample {curl} Пример:
     *   curl -v http://127.0.0.1:3000/api/tag
     */
    @Get('/tag')
    public async search(
        @QueryParam('query') query?: string
    ): Promise<TagListResponse> {
        const tags = await this.tagService.search(query);
        return { tags };
    }

}

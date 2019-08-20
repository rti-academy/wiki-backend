import {
    JsonController,
    Get,
    Post,
    Put,
    Delete,
    HttpCode,
    OnUndefined,
    Param,
    BodyParam,
    QueryParam,
} from 'routing-controllers';

import { ArticleService } from '../services/ArticleService';
import { CreateArticleBody } from '../requests/CreateArticleBody';
import { UpdateArticleBody } from '../requests/UpdateArticleBody';
import { ArticleResponse } from '../responses/ArticleResponse';
import { ArticleListResponse } from '../responses/ArticleListResponse';

@JsonController('/article')
export class ArticleController {

    private articleService: ArticleService = new ArticleService();

    /**
     * @api {POST} /api/article/:id Создать статью
     * @apiName create
     * @apiGroup article
     *
     * @apiUse CreateArticleBody
     *
     * @apiSuccess (Success 201) Created Successfully created
     *
     * @apiExample {curl} Пример:
     *   curl -v -H "Content-Type: application/json" -d '{"article":{"title":"Test","content":"Test","parentId":0}}' http://127.0.0.1:3000/api/article
     */
    @Post('/')
    @HttpCode(201)
    public async create(
        @BodyParam('article', { required: true }) body: CreateArticleBody
    ): Promise<{ id: number }> {
        const id = await this.articleService.create(body);
        return { id };
    }

    /**
     * @api {PUT} /api/article/:id Обновить статью
     * @apiName update
     * @apiGroup article
     *
     * @apiParam (Route params) {number} id
     *
     * @apiUse UpdateArticleBody
     *
     * @apiSuccess (Success 204) NoContent Successfully updated
     *
     * @apiError (Not Found 404) NotFoundError <code>id</code> was not found
     *
     * @apiExample {curl} Пример:
     *   curl -v -X PUT -H "Content-Type: application/json" -d '{"article":{"title":"Test!"}}' http://127.0.0.1:3000/api/article/1
     */
    @Put('/:id')
    @OnUndefined(204)
    public async update(
        @Param('id') id: number,
        @BodyParam('article', { required: true }) body: UpdateArticleBody
    ): Promise<void> {
        await this.articleService.update(id, body);
    }

    /**
     * @api {DELETE} /api/article/:id Удалить статью
     * @apiName delete
     * @apiGroup article
     *
     * @apiParam (Route params) {number} id
     *
     * @apiSuccess (Success 204) NoContent Successfully deleted
     *
     * @apiError (Not Found 404) NotFoundError <code>id</code> was not found
     *
     * @apiExample {curl} Пример:
     *   curl -v -X DELETE http://127.0.0.1:3000/api/article/1
     */
    @Delete('/:id')
    @OnUndefined(204)
    public async delete(
        @Param('id') id: number,
    ): Promise<void> {
        await this.articleService.delete(id);
    }

    /**
     * @api {GET} /api/article/:id Получить статью
     * @apiName get
     * @apiGroup article
     *
     * @apiParam (Route params) {string} id
     *
     * @apiUse ArticleResponse
     *
     * @apiError (Not Found 404) articleNotFoundError <code>id</code> was not found
     *
     * @apiExample {curl} Пример:
     *   curl -v http://127.0.0.1:3000/api/article/1
     */
    @Get('/:id')
    public async get(
        @Param('id') id: number,
    ): Promise<ArticleResponse> {
        const article = await this.articleService.get(id);
        return { article };
    }

    /**
     * @api {GET} /api/article Найти статью
     * @apiName search
     * @apiGroup article
     *
     * @apiUse ArticleListResponse
     *
     * @apiExample {curl} Пример:
     *   curl -v http://127.0.0.1:3000/api/article
     */
    @Get('/')
    public async search(
        @QueryParam('query') query?: string
    ): Promise<ArticleListResponse> {
        const articles = await this.articleService.search(query);
        return { articles };
    }

}

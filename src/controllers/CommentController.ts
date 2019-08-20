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
} from 'routing-controllers';

import { CommentService } from '../services/CommentService';
import { CreateCommentBody } from '../requests/CreateCommentBody';
import { CommentResponse } from '../responses/CommentResponse';
import { UpdateCommentBody } from '../requests/UpdateCommentBody';
import { CommentListResponse } from '../responses/CommentListResponse';

@JsonController('/comment')
export class CommentContrller {

    private commentService: CommentService = new CommentService();

    /**
     * @api {POST} /api/comment Оставить комментарий
     * @apiName create
     * @apiGroup comment
     *
     * @apiUse CreateCommentBody
     *
     * @apiSuccess (Success 201) Created Successfully created
     *
     * @apiExample {curl} Пример:
     *   curl -v -H "Content-Type: application/json" -d '{"comment":{"text":"Some text","articleId":1}}' http://127.0.0.1:3000/api/comment
     */
    @Post('/')
    @HttpCode(201)
    public async create(
        @BodyParam('comment', { required: true }) body: CreateCommentBody
    ): Promise<{ id: number }> {
        const id = await this.commentService.create(body);
        return { id };
    }

    /**
     * @api {PUT} /api/comment/:id Изменить комментарий
     * @apiName update
     * @apiGroup comment
     *
     * @apiParam (Route params) {number} id
     *
     * @apiUse UpdateCommentBody
     *
     * @apiSuccess (Success 204) NoContent Successfully updated
     *
     * @apiError (Not Found 404) NotFoundError <code>id</code> was not found
     *
     * @apiExample {curl} Пример:
     *   curl -v -X PUT -H "Content-Type: application/json" -d '{"comment":{"text":"Some text!"}}' http://127.0.0.1:3000/api/comment/1
     */
    @Put('/:id')
    @OnUndefined(204)
    public async update(
        @Param('id') id: number,
        @BodyParam('comment', { required: true }) body: UpdateCommentBody
    ): Promise<void> {
        await this.commentService.update(id, body);
    }

    /**
     * @api {DELETE} /api/comment/:id Удалить комментарий
     * @apiName delete
     * @apiGroup comment
     *
     * @apiParam (Route params) {number} id
     *
     * @apiSuccess (Success 204) NoContent Successfully deleted
     *
     * @apiError (Not Found 404) NotFoundError <code>id</code> was not found
     *
     * @apiExample {curl} Пример:
     *   curl -v -X DELETE http://127.0.0.1:3000/api/comment/1
     */
    @Delete('/:id')
    @OnUndefined(204)
    public async delete(
        @Param('id') id: number
    ): Promise<void> {
        await this.commentService.delete(id);
    }

    // TODO: Remove
    @Get('/:id')
    public async get(
        @Param('id') id: number,
    ): Promise<CommentResponse> {
        const comment = await this.commentService.get(id);
        return { comment };
    }

    /**
     * @api {GET} /api/comment Получить список комментариев
     * @apiName getByArticle
     * @apiGroup comment
     *
     * @apiParam (Query params) {number} articleId
     *
     * @apiUse CommentListResponse
     *
     * @apiExample {curl} Пример:
     *   curl -v http://127.0.0.1:3000/api/comment?articleId=1
     */
    @Get('/')
    public async getByArticle(): Promise<CommentListResponse> {
        const comments = await this.commentService.search();
        return { comments };
    }

}

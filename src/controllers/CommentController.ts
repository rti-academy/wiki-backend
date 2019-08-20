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

    @Post('/')
    @HttpCode(201)
    public async create(
        @BodyParam('comment', { required: true }) body: CreateCommentBody
    ): Promise<{ id: number }> {
        const id = await this.commentService.create(body);
        return { id };
    }

    @Put('/:id')
    @OnUndefined(204)
    public async update(
        @Param('id') id: number,
        @BodyParam('comment', { required: true }) body: UpdateCommentBody
    ): Promise<void> {
        await this.commentService.update(id, body);
    }

    @Delete('/:id')
    @OnUndefined(204)
    public async delete(
        @Param('id') id: number
    ): Promise<void> {
        await this.commentService.delete(id);
    }


    @Get('/:id')
    public async get(
        @Param('id') id: number,
    ): Promise<CommentResponse> {
        const comment = await this.commentService.get(id);
        return { comment };
    }

    @Get('/')
    public async search(): Promise<CommentListResponse> {
        const comments = await this.commentService.search();
        return { comments };
    }
}
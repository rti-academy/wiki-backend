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

import { ArticleService } from '../services/ArticleService';
import { CreateArticleBody } from '../requests/CreateArticleBody';
import { UpdateArticleBody } from '../requests/UpdateArticleBody';
import { ArticleResponse } from '../responses/ArticleResponse';
import { ArticleListResponse } from '../responses/ArticleListResponse';

@JsonController('/article')
export class ArticleController {

    private articleService: ArticleService = new ArticleService();

    @Post('/')
    @HttpCode(201)
    public async create(
        @BodyParam('article', { required: true }) body: CreateArticleBody
    ): Promise<{ id: number }> {
        const id = await this.articleService.create(body);
        return { id };
    }

    @Put('/:id')
    @OnUndefined(204)
    public async update(
        @Param('id') id: number,
        @BodyParam('article', { required: true }) body: UpdateArticleBody
    ): Promise<void> {
        await this.articleService.update(id, body);
    }

    @Delete('/:id')
    @OnUndefined(204)
    public async delete(
        @Param('id') id: number,
    ): Promise<void> {
        await this.articleService.delete(id);
    }

    @Get('/:id')
    public async get(
        @Param('id') id: number,
    ): Promise<ArticleResponse> {
        const article = await this.articleService.get(id);
        return { article };
    }

    @Get('/')
    public async find(): Promise<ArticleListResponse> {
        const articles = await this.articleService.find();
        return { articles };
    }

}

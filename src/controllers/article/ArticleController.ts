import { JsonController, Get } from 'routing-controllers';

import { ArticleListResponse } from './responses';

@JsonController('/article')
export class ArticleController {

    @Get('/')
    public getList(): ArticleListResponse {
        return {
            articles: [],
        };
    }

}

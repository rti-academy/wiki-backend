import { ArticleData } from './ArticleData';

/**
 * @apiDefine ArticleListResponse
 * @apiSuccess {Object[]} articles
 * @apiSuccess {number} .id
 * @apiSuccess {string} .title
 * @apiSuccess {string} .content
 * @apiSuccess {number} .parentId
 * @apiSuccess {number} .version
 * @apiSuccess {string} .creationTime
 * @apiSuccess {string} .updateTime
 */
export class ArticleListResponse {
    articles: ArticleData[];
}

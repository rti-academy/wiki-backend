import { ArticleData } from './ArticleData';

/**
 * @apiDefine ArticleResponse
 * @apiSuccess {Object} article
 * @apiSuccess {number} .id
 * @apiSuccess {string} .title
 * @apiSuccess {string} .content
 * @apiSuccess {number} .parentId
 * @apiSuccess {number} .version
 * @apiSuccess {string} .creationTime
 * @apiSuccess {string} .updateTime
 */
export interface ArticleResponse {
    article: ArticleData;
}

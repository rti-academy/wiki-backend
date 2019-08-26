import { ArticleData } from './ArticleData';

/**
 * @apiDefine ArticleResponse
 * @apiSuccess {Object} article
 * @apiSuccess {number} .id
 * @apiSuccess {string} .title
 * @apiSuccess {string} .content
 * @apiSuccess {string="note","rubric"} .type
 * @apiSuccess {number} .parentId
 * @apiSuccess {string="draft","active","archive"} .status
 * @apiSuccess {number} .version
 * @apiSuccess {string} .creationTime
 * @apiSuccess {string} .updateTime
 */
export interface ArticleResponse {
    article: ArticleData;
}

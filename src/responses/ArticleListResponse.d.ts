import { NodeData } from './NodeData';

/**
 * @apiDefine ArticleListResponse
 * @apiSuccess {Object[]} articles
 * @apiSuccess {number} .id
 * @apiSuccess {string} .title
 * @apiSuccess {string="note","rubric"} .type
 * @apiSuccess {number} .parentId
 * @apiSuccess {string="draft","active","archive"} .status
 */
export interface ArticleListResponse {
    articles: NodeData[];
}

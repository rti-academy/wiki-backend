import { NodeData } from './NodeData';

/**
 * @apiDefine ArticleListResponse
 * @apiSuccess {Object[]} articles
 * @apiSuccess {number} .id
 * @apiSuccess {string} .title
 * @apiSuccess {string="note","rubric"} .type
 * @apiSuccess {number} .parentId
 */
export interface ArticleListResponse {
    articles: NodeData[];
}

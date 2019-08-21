import { NodeType } from '../entities/Article';

/**
 * @apiDefine SearchArticleQuery
 * @apiParam (Query params) {string} [query]
 * @apiParam (Query params) {string="note","rubric"} [type]
 */
export class SearchArticleQuery {

    public query?: string;

    public type?: NodeType;

}

import { NodeType } from '../entities/Article';

/**
 * @apiDefine CreateArticleBody
 * @apiParam (Body params) {Object} article
 * @apiParam (Body params) {string} .title
 * @apiParam (Body params) {string="note","rubric"} [.type]
 * @apiParam (Body params) {string} [.content]
 * @apiParam (Body params) {number} .parentId
 */
export class CreateArticleBody {

    public title: string;

    public type?: NodeType;

    public content?: string;

    public parentId: number;

}

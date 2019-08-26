import { Status } from '../entities/Article';

/**
 * @apiDefine UpdateArticleBody
 * @apiParam (Body params) {Object} article
 * @apiParam (Body params) {string} [.title]
 * @apiParam (Body params) {string} [.content]
 * @apiParam (Body params) {number} [.parentId]
 * @apiParam (Body params) {string="draft","active","archive"} [.status]
 */
export class UpdateArticleBody {

    public title?: string;

    public content?: string;

    public parentId?: number;

    public status?: Status;

}

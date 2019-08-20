/**
 * @apiDefine CreateCommentBody
 * @apiParam (Body params) {Object} comment
 * @apiParam (Body params) {string} .text
 * @apiParam (Body params) {number} .articleId
 */
export class CreateCommentBody {

    public articleId: number;

    public text: string;

}

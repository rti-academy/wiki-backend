import { CommentData } from "./CommentData";

/**
 * @apiDefine CommentListResponse
 * @apiSuccess {Object[]} tags
 * @apiSuccess {number} .id
 * @apiSuccess {number} .articleId
 * @apiSuccess {string} .text
 * @apiSuccess {string} .publishDate
 */
export interface CommentListResponse {
    comments: CommentData[];
}

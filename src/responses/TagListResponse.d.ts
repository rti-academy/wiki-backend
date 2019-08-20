import { TagData } from './TagData';

/**
 * @apiDefine TagListResponse
 * @apiSuccess {Object[]} tags
 * @apiSuccess {number} .id
 * @apiSuccess {string} .value
 */
export interface TagListResponse {
    tags: TagData[];
}

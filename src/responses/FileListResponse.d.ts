import { FileData } from './FileData';

/**
 * @apiDefine FileListResponse
 * @apiSuccess {Object[]} files
 * @apiSuccess {number} .id
 * @apiSuccess {string} .name
 */
export interface FileListResponse {
    files: FileData[];
}

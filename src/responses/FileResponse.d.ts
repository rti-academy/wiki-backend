import { FileData } from './FileData';

/**
 * @apiDefine FileResponse
 * @apiSuccess {Object} file
 * @apiSuccess {number} .id
 * @apiSuccess {string} .name
 */
export interface FileResponse {
    file: FileData;
}

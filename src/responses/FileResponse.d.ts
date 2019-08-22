/**
 * @apiDefine FileResponse
 * @apiSuccess {Object} file
 * @apiSuccess {number} .id
 * @apiSuccess {string} .fileUrl
 */
export interface FileResponse {
    id: number,
    fileUrl: string
}

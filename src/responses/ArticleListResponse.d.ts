export interface ArticleListData {
    id: number;
    title: string;
    content: string;
    parentId: number;
    version: number;
    creationTime: string;
    updateTime: string;
}

/**
 * @apiDefine ArticleListResponse
 * @apiSuccess {Object[]} articles
 * @apiSuccess {number} .id
 * @apiSuccess {string} .title
 * @apiSuccess {string} .content
 * @apiSuccess {number} .parentId
 * @apiSuccess {number} .version
 * @apiSuccess {string} .creationTime
 * @apiSuccess {string} .updateTime
 */
export interface ArticleListResponse {
    articles: ArticleListData[];
}

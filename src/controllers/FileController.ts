import {
    JsonController,
    Post,
    Delete,
    Get,
    HttpCode,
    UploadedFile,
    Param,
    Res,
    OnUndefined,
} from 'routing-controllers';
import * as path from 'path';
import * as multer from 'multer';
import { Response } from 'express';

import { FileService } from '../services/FileService';
import { FileResponse } from '../responses/FileResponse';
import { FileListResponse } from '../responses/FileListResponse';

const uploadOptions: multer.Options = {
    storage: multer.diskStorage({
        destination: (_Request, _file, callback) => {
            callback(null, path.resolve(__dirname, '../..', 'uploads'));
        },
        filename: (_Request, file, callback) => {
            callback(null, `${Date.now()}${path.extname(file.originalname)}`);
        }
    })
};

@JsonController('/article/:articleId/file')
export class FileController {

    private fileService: FileService = new FileService();

    /**
     * @api {POST} /api/article/:articleId/file Загрузить файл
     * @apiName create
     * @apiGroup file
     *
     * @apiDescription Загрузка файла через multipart/form-data
     *
     * @apiParam (Route params) {number} id
     *
     * @apiParam (multipart/form-data) {File} file
     *
     * @apiUse FileResponse
     *
     * @apiExample {curl} Загрузить файл
     *   curl -i -X POST -H "Content-Type:multipart/form-data" -F "file=@\"./example.png\";type=image/png;filename=\"example.png\"" 'http://127.0.0.1:3000/api/article/1/file'
     */
    @Post('/')
    @HttpCode(200)
    public async create(
        @Param('articleId') articleId: number,
        @UploadedFile('file', { options: uploadOptions }) file: Express.Multer.File
    ): Promise<FileResponse> {
        const { article, ...data } = await this.fileService.create({
            originalName: file.originalname,
            name: file.filename,
            articleId,
        });

        return { file: data };
    }

    /**
     * @api {DELETE} /api/article/:articleId/file/:fileId Удалить файл
     * @apiName delete
     * @apiGroup tag
     *
     * @apiParam (Route params) {number} articleId
     * @apiParam (Route params) {number} fileId
     *
     * @apiSuccess (Success 204) NoContent Successfully deleted
     *
     * @apiError (Not Found 404) NotFoundError <code>id</code> was not found
     *
     * @apiExample {curl} Пример:
     *   curl -v -X DELETE http://127.0.0.1:3000/api/article/2/file/1
     */
    @OnUndefined(204)
    @Delete('/:fileId')
    public async delete(
        @Param('fileId') fileId: number,
    ): Promise<void> {
        await this.fileService.delete(fileId);
    }

    /**
     * @api {GET} /api/article/:articleId/file/:fileId Скачать файл
     * @apiName download
     * @apiGroup file
     *
     * @apiParam (Route params) {number} articleId
     * @apiParam (Route params) {number} fileId
     *
     * @apiSuccess (Redirect 307) TemporaryRedirect
     *
     * @apiExample {curl} Скачать файл
     *   curl -v http://127.0.0.1:3000/api/article/2/file/1
     */
    @Get('/:fileId')
    @OnUndefined(307)
    public async download(
        @Param('fileId') fileId: number,
        @Res() response: Response,
    ): Promise<any> {
        const file = await this.fileService.get(fileId);
        response.location(file.getUrl());
        response.setHeader('Cache-control', 'no-cache, no-store, max-age=0, must-revalidate');
    }

    /**
     * @api {GET} /api/article/:articleId/file Получить файлы статьи
     * @apiName get
     * @apiGroup file
     *
     * @apiParam (Route params) {number} articleId
     *
     * @apiUse FileListResponse
     *
     * @apiExample {curl} Получить файлы
     *   curl -v http://127.0.0.1:3000/api/article/2/file
     */
    @Get('/')
    public async getByArticle(
        @Param('articleId') articleId: number,
    ): Promise<FileListResponse> {
        const files = await this.fileService.getByArticle(articleId);
        return {
            files: files.map(item => ({
                id: item.id,
                name: item.originalName,
            }))
        };
    }

}

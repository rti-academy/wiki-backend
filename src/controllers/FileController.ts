import {
    JsonController,
    Post,
    HttpCode,
    UploadedFile,
    QueryParam
} from 'routing-controllers';
import * as path from 'path';
import * as multer from 'multer';

import { FileService } from '../services/FileService';
import { FileResponse } from '../responses/FileResponse';

const STATIC_URL = '/static';

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
     * @api {POST} /api/article/:id/file Загрузить файл
     * @apiName create
     * @apiGroup file
     *
     * @apiDescription Загрузка файла через multipart/form-data
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
        @QueryParam('articleId') articleId: number,
        @UploadedFile('file', { options: uploadOptions }) file: Express.Multer.File
    ): Promise<FileResponse> {
        const createdFile = await this.fileService.create(file.filename, articleId);
        return {
            id: createdFile.id,
            fileUrl: `${STATIC_URL}/${createdFile.name}`
        };
    }
}

import { getRepository, getConnection } from 'typeorm';

import { Comment } from '../entities/Comment';
import { CreateCommentBody } from '../requests/CreateCommentBody';
import { UpdateCommentBody } from '../requests/UpdateCommentBody';
import { CommentData } from '../responses/CommentData';

export class CommentService {

    public async create(data: CreateCommentBody): Promise<number> {
        const time = new Date();

        const { id } = await getRepository(Comment).save({
            ...data,
            publishDate: time.toISOString(),
        });

        return id;
    }

    public async update(id: number, data: UpdateCommentBody) {
        getRepository(Comment).findOneOrFail(id);

        await getConnection()
            .createQueryBuilder()
            .update(Comment)
            .set({
                ...data,
            })
            .where('id = :id', { id })
            .execute();
    }

    public async delete(id: number) {
        await getRepository(Comment).findOneOrFail(id);
        await getRepository(Comment).delete(id);
    }

    public async get(id: number): Promise<CommentData> {
        return getRepository(Comment).findOneOrFail(id);
    }

    public async search(): Promise<CommentData[]> {
        return getRepository(Comment).find();
    }
}
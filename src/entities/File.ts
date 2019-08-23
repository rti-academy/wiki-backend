import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import * as path from 'path';

import { Article } from './Article';

const STATIC_URL = '/static';
const UPLOADS_PATH = path.resolve(__dirname, '../..', 'uploads');

@Entity('file')
export class File {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column({
        name: 'original_name',
        default: 'name',
    })
    public originalName: string;

    @ManyToOne(
        type => Article,
        article => article.files, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'article_id' })
    public article: Article;

    public getUrl(): string {
        return `${STATIC_URL}/${this.name}`;
    }

    public getPath(): string {
        return `${UPLOADS_PATH}/${this.name}`;
    }

}

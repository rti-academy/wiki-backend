import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Article } from './Article';

@Entity('file')
export class File {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'name'})
    public name: string;

    @ManyToOne(
        type => Article,
        article => article.files, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'article_id' })
    public article: Article;
}

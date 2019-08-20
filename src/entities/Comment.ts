import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('comment')
export class Comment {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'article_id'})
    public articleId: number;

    @Column({ name: 'publish_date' })
    public publishDate: string;
    
    @Column()
    public text: string;
}
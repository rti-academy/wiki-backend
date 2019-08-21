import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from './Tag';

export enum NodeType {
    Note = 'note',
    Rubric = 'rubric',
}

@Entity('article')
export class Article {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column({ default: NodeType.Note })
    public type: NodeType;

    @Column()
    public content: string;

    @Column({ name: 'parent_id' })
    public parentId: number;

    @Column()
    public version: number;

    @Column({ name: 'creation_time' })
    public creationTime: string;

    @Column({ name: 'update_time' })
    public updateTime: string;

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];

}

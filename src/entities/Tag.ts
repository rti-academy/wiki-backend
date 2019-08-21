import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('tag')
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

}
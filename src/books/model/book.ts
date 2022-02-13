import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Book {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    quantity: number

    @Column()
    description: String

    @CreateDateColumn()
    createdAt: Date;
}
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: true })
    name!: string;

    @Column('text', { nullable: true })
    email!: string;

    @Column('text', { nullable: true })
    password!: string;

    constructor() {
        this.id = uuidv4();
    }
}

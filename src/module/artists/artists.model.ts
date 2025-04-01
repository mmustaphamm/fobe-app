import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import BaseModel from '../../models/base.model'

@Entity({ name: 'artists', engine: 'MEMORY' })
export class Artists extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        nullable: false,
    })
    name: string;

    @Column({ nullable: false })
    bio: string;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

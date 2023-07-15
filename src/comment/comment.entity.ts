import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @CreateDateColumn({
        type: 'timestamp',
        name: 'createdAt',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updatedAt',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date
}
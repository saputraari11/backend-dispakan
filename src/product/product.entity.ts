import { Store } from 'src/store/store.entity'
import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm'

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    sale: number

    @Column()
    price: number

    @Column()
    description: string

    @Column('text')
    image: string;

    @Column()
    loved:number

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

    @ManyToOne(
        type => Store,
        s => s.product,
    )
    store: Store
}
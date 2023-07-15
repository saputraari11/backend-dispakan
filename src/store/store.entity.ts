import { Product } from 'src/product/product.entity'
import { User } from 'src/users/user.entity'
import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm'

@Entity()
export class Store extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    address: string

    @Column()
    phone: string

    @Column({
        type:"text"
    })
    linkSaved: string

    @Column()
    omset:string

    @Column()
    filename: string

    @Column()
    image: string

    @Column({
        type:"text"
    })
    katagoriSaved:string

    @Column()
    aspek:string

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
        type => User,
        u => u.store,
    )
    user: User

    @OneToMany(
        type => Product,
        p => p.store,
    )
    product: Product[]

    link:any[]
    katagori:any[]

    public async convertStringToArray() {
        this.katagori = JSON.parse(this.katagoriSaved).split(',')
        this.link = JSON.parse(this.linkSaved).split(',')
    }
}
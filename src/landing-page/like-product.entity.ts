import { Product } from 'src/product/product.entity'
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
export class LikeProduct extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  identifier: string

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
    type => Product,
    p => p.like,
  )
  product: Product
}

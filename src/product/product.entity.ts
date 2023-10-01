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

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string

  @Column({
    type: 'text',
    nullable: true,
  })
  filenameSaved: string

  @Column({
    type: 'text',
    nullable: true,
  })
  imagesSaved: string

  @Column({
    type: 'text',
    nullable: true,
  })
  othersSaved: string

  @Column({ nullable: null })
  category: string

  @Column({
    type: 'text',
    nullable: true,
  })
  mediaId: string

  @Column({
    nullable: true,
  })
  active_on: string

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

  images: string[] = null
  others: string[] = null
  mediaIds: string[] = null
  price_discount: number
  discount: number

  public async countingDiscount() {
    const discount = (this.sale / 100) * this.price
    this.discount = discount
    this.price_discount = this.price - discount
  }

  public async convertStringToArray() {
    if (this.imagesSaved) this.images = JSON.parse(this.imagesSaved)
    if (this.mediaId) this.mediaIds = JSON.parse(this.mediaId)
    if (this.othersSaved) this.others = JSON.parse(this.othersSaved)
  }
}

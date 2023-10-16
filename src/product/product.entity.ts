import { ClickProduct } from 'src/landing-page/click-product.entity'
import { LikeProduct } from 'src/landing-page/like-product.entity'
import { Store } from 'src/store/store.entity'
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
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

  @Column({
    default: false,
  })
  status: boolean

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

  @OneToMany(
    type => LikeProduct,
    l => l.product,
  )
  like: LikeProduct[]

  @OneToMany(
    type => ClickProduct,
    c => c.product,
  )
  click: ClickProduct[]

  images: string[] = null
  others_descriptions: string[] = null
  mediaIds: string[] = null
  price_discount: number
  discount: number
  jumlah_like: number

  public async countingDiscount() {
    const discount = (Number(this.sale) / 100) * Number(this.price)
    this.discount = discount
    this.price_discount = this.price - discount
  }

  public async convertStringToArray() {
    if (this.imagesSaved) this.images = JSON.parse(this.imagesSaved)
    if (this.mediaId) this.mediaIds = JSON.parse(this.mediaId)
    if (this.othersSaved)
      this.others_descriptions = JSON.parse(this.othersSaved)

    if (this.like) this.jumlah_like = this.like.length
  }
}

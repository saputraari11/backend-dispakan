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
  varianSaved: string

  @Column({
    type: 'text',
    nullable: true,
  })
  typesSaved: string

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
  varian: string[] = null
  types: string[] = null
  files: string[] = null
  price_discount: number
  discount: number
  url_image: string[]

  public async countingDiscount() {
    const discount = (this.sale / 100) * this.price
    this.discount = discount
    this.price_discount = this.price - discount
  }

  public async convertStringToArray() {
    if (this.imagesSaved) this.images = JSON.parse(this.imagesSaved)
    if (this.filenameSaved) this.files = JSON.parse(this.filenameSaved)
    if (this.othersSaved) this.others = JSON.parse(this.othersSaved).split(',')
    if (this.varianSaved) this.varian = JSON.parse(this.varianSaved).split(',')
    if (this.typesSaved) this.types = JSON.parse(this.typesSaved).split(',')
  }
}

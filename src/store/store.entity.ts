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
    type: 'text',
    nullable: true,
  })
  mediaOrdered: string

  @Column({
    type: 'text',
    nullable: true,
  })
  mediaContact: string

  @Column()
  omset: string

  @Column({
    nullable: true,
  })
  filename: string

  @Column({
    nullable: true,
  })
  image: string

  @Column({
    type: 'text',
    nullable: true,
  })
  katagoriSaved: string

  @Column()
  aspek: string

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

  media_ordered: any[] = null
  media_contact: any[] = null
  katagori_umkm: any[] = null
  url_image: string

  public async convertStringToArray() {
    if (this.katagoriSaved)
      this.katagori_umkm = JSON.parse(this.katagoriSaved).split(',')
    if (this.mediaOrdered)
      this.media_ordered = JSON.parse(this.mediaOrdered).split(',')
    if (this.mediaContact)
      this.media_contact = JSON.parse(this.mediaContact).split(',')
  }
}

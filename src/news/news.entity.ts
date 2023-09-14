import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class News extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  posted_date: Date

  @Column('text', {
    nullable: true,
  })
  filename: string

  @Column('text', {
    nullable: true,
  })
  image: string

  @Column()
  status: boolean

  @Column({
    type: 'text',
    nullable: true,
  })
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

  url_image:string
}

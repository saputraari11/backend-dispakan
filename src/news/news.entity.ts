import { Comment } from '../comment/comment.entity'
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'

@Entity()
export class News extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    nullable: true,
  })
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

  @Column({ default: false })
  status: boolean

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string

  @Column({
    nullable: true,
  })
  active_on: string

  @Column({
    nullable: true,
  })
  mediaId: string

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

  @OneToMany(
    type => Comment,
    c => c.news,
  )
  comments: Comment[]

  url_image: string
}

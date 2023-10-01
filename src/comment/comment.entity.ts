import { News } from 'src/news/news.entity'
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
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: 'anonymous' })
  name: string

  @Column()
  description: string

  @Column({ nullable: true })
  periode: Date

  @Column({ default: 'belum disetujui' })
  is_proved: string

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
    type => News,
    n => n.comments,
  )
  news: News
}

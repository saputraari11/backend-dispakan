import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { UserLevel } from './user-level.enum'
import { Store } from 'src/store/store.entity'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    nullable: true,
  })
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  salt: string

  @Column()
  level: UserLevel

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  address: string

  @Column({ default: true })
  status: boolean

  @Column('text', {
    nullable: true,
  })
  filename: string

  @Column('text', {
    nullable: true,
  })
  image: string

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
    type => Store,
    s => s.user,
  )
  store: Store[]

  url_image:string

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
  }
}

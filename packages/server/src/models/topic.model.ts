import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  HasMany,
} from 'sequelize-typescript'
import { Comment } from './comment.model'
import { v4 as uuidv4 } from 'uuid'

@Table
export class Topic extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column({ type: DataType.UUID })
  override id!: string

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  title!: string

  @Column({ type: DataType.TEXT, allowNull: false })
  description!: string

  @Column({ type: DataType.STRING, allowNull: true })
  category?: string

  @Column({ type: DataType.STRING, allowNull: false })
  author!: string

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  commentCount!: number

  @Column({ type: DataType.DATE, allowNull: true })
  lastCommentAt?: Date

  @HasMany(() => Comment)
  comments!: Comment[]
}

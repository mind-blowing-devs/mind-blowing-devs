import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
} from 'sequelize-typescript'
import { Comment } from './comment.model'

@Table
export class Topic extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  title!: string

  @Column({ type: DataType.TEXT, allowNull: false })
  description!: string

  @Column({ type: DataType.STRING, allowNull: true })
  category?: string

  @Column({ type: DataType.STRING, allowNull: false })
  author!: string

  @CreatedAt
  @Column({ type: DataType.DATE })
  override createdAt!: Date

  @HasMany(() => Comment)
  comments!: Comment[]
}

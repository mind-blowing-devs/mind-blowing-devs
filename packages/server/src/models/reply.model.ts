import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Default,
} from 'sequelize-typescript'
import { v4 as uuidv4 } from 'uuid'
import { Comment } from './comment.model'

@Table
export class Reply extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column({ type: DataType.UUID })
  override id!: string

  @ForeignKey(() => Comment)
  @Column({ type: DataType.UUID, allowNull: false, onDelete: 'CASCADE' })
  commentId!: string

  @Column(DataType.TEXT)
  body!: string

  @Column(DataType.STRING)
  author!: string

  @BelongsTo(() => Comment)
  comment!: Comment
}

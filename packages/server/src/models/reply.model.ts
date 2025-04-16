import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { Comment } from './comment.model'

@Table
export class Reply extends Model {
  @ForeignKey(() => Comment)
  @Column(DataType.INTEGER)
  commentId!: number

  @Column(DataType.TEXT)
  body!: string

  @Column(DataType.STRING)
  author!: string

  @BelongsTo(() => Comment)
  comment!: Comment
}

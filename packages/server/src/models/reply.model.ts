import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Default,
  HasMany,
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

  @ForeignKey(() => Reply)
  @Column({ type: DataType.UUID, allowNull: true, onDelete: 'CASCADE' }) // nullable for root replies
  parentReplyId!: string

  @Column(DataType.TEXT)
  body!: string

  @Column(DataType.STRING)
  author!: string

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  repliesCount!: number

  @BelongsTo(() => Comment)
  comment!: Comment

  @BelongsTo(() => Reply)
  parentReply?: Reply // parent reply, if this is a nested reply

  @HasMany(() => Reply)
  replies!: Reply[]
}

import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  PrimaryKey,
  Default,
} from 'sequelize-typescript'
import { v4 as uuidv4 } from 'uuid'
import { Topic } from './topic.model'
import { Reply } from './reply.model'

@Table
export class Comment extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column({ type: DataType.UUID })
  override id!: string

  @ForeignKey(() => Topic)
  @Column({ type: DataType.UUID, allowNull: false, onDelete: 'CASCADE' })
  topicId!: string

  @Column({ type: DataType.TEXT, allowNull: false })
  body!: string

  @Column({ type: DataType.STRING, allowNull: false })
  author!: string

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  repliesCount!: number

  @BelongsTo(() => Topic)
  topic!: Topic

  @HasMany(() => Reply)
  replies!: Reply[]
}

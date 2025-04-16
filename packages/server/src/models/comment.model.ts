import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'
import { Topic } from './topic.model'
import { Reply } from './reply.model'

@Table
export class Comment extends Model {
  @ForeignKey(() => Topic)
  @Column(DataType.UUID)
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

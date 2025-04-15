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
  @Column(DataType.INTEGER)
  topicId!: number

  @Column(DataType.TEXT)
  body!: string

  @Column(DataType.INTEGER)
  authorId!: number

  @BelongsTo(() => Topic)
  topic!: Topic

  @HasMany(() => Reply)
  replies!: Reply[]
}

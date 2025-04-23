import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript'
import { Reply } from './reply.model'

@Table({
  tableName: 'reactions',
})
export class Reaction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  override id!: number

  @ForeignKey(() => Reply)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  replyId!: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  emoji!: string

  @CreatedAt
  @Column(DataType.DATE)
  override createdAt!: Date

  @UpdatedAt
  @Column(DataType.DATE)
  override updatedAt!: Date
}

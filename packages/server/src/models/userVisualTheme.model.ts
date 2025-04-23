import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  Default,
  BelongsTo,
} from 'sequelize-typescript'

import { User } from './user.model'
import { VisualTheme } from './visualTheme.model'
import { v4 as uuidv4 } from 'uuid'

@Table
export class UserVisualTheme extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column({ type: DataType.UUID })
  override id!: string

  @ForeignKey(() => VisualTheme)
  @Column({ type: DataType.UUID, allowNull: false, onDelete: 'CASCADE' })
  visualThemeId!: string

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false, onDelete: 'CASCADE' })
  userId!: string

  @BelongsTo(() => User)
  user!: User

  @BelongsTo(() => VisualTheme)
  visualTheme!: VisualTheme
}

import { Table, Column, Model, DataType, PrimaryKey, Default, HasMany } from 'sequelize-typescript'
import { v4 as uuidv4 } from 'uuid'
import { UserVisualTheme } from './userVisualTheme.model'

@Table
export class VisualTheme extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column({ type: DataType.UUID })
  override id!: string

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  name!: string

  @Column({ type: DataType.JSON, allowNull: true })
  settings?: string

  @HasMany(() => UserVisualTheme)
  userVisualTheme!: UserVisualTheme
}

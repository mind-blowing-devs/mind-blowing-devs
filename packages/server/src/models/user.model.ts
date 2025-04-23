import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  HasOne,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { UserVisualTheme } from './userVisualTheme.model'

@Table
export class User extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column({ type: DataType.UUID })
  override id!: string

  @Column({ type: DataType.TEXT, allowNull: false })
  first_name!: string

  @Column({ type: DataType.TEXT, allowNull: false })
  second_name!: string

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  login!: string

  @Column({ type: DataType.TEXT, allowNull: false })
  password!: string

  @Column({ type: DataType.TEXT, allowNull: true })
  display_name?: string

  @Column({ type: DataType.TEXT, allowNull: false })
  phone!: string

  @Column({ type: DataType.TEXT, allowNull: true })
  avatar?: string

  @Column({ type: DataType.TEXT, allowNull: false })
  email!: string

  @HasOne(() => UserVisualTheme)
  userVisualTheme!: UserVisualTheme

  @BeforeCreate
  static async encriptPassword(user: User) {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
  }

  @BeforeUpdate
  static async encriptPasswordOnChange(user: User) {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(user.password, salt)
    }
  }
}

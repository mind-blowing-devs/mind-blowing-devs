import { User } from '../models'
import type { CreateUserData } from '../types'
import { sequelize } from '../db'

export const createUser = async (data: CreateUserData) => {
  const transaction = await sequelize.transaction()

  try {
    const user = await User.create(data, { transaction })
    await transaction.commit()

    const userData = user.get({ plain: true })
    delete userData.updatedAt

    return userData
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

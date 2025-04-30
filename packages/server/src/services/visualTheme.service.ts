import { VisualTheme, User, UserVisualTheme } from '../models'
import type { CreateVisualThemeData, GetVisualThemeData, SetUserVisualThemeData } from '../types'
import { sequelize } from '../db'
// import { Op } from 'sequelize'
import { VISUAL_THEME_NOT_FOUND, USER_NOT_FOUND } from '../constants'

export const createVisualTheme = async (data: CreateVisualThemeData) => {
  const transaction = await sequelize.transaction()

  try {
    const visualTheme = await VisualTheme.create(data, { transaction })
    await transaction.commit()
    const visualThemeData = visualTheme.get({ plain: true })
    delete visualThemeData.updatedAt

    return visualTheme
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const getVisualThemes = async ({ offset, limit }: GetVisualThemeData) => {
  return await VisualTheme.findAll({
    order: [['createdAt', 'DESC']],
    offset,
    limit,
    attributes: { exclude: ['updatedAt'] },
  })
}

export const deleteVisualTheme = async (visualThemeId: string) => {
  const transaction = await sequelize.transaction()

  try {
    const vt = await VisualTheme.findByPk(visualThemeId, { transaction })
    if (!vt) {
      throw new Error(VISUAL_THEME_NOT_FOUND)
    }

    await vt.destroy({ transaction })

    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const setUserVisualTheme = async (data: SetUserVisualThemeData) => {
  const { userId, visualThemeId } = data
  const transaction = await sequelize.transaction()

  try {
    const vt = await VisualTheme.findByPk(visualThemeId, { transaction })
    if (!vt) {
      throw new Error(VISUAL_THEME_NOT_FOUND)
    }

    const user = await User.findByPk(userId, { transaction })

    if (!user) {
      throw new Error(USER_NOT_FOUND)
    }

    const existingRow = await UserVisualTheme.findOne({
      where: { userId },
      transaction,
    })

    let resultRow
    if (existingRow) {
      resultRow = await existingRow.update({ visualThemeId }, { transaction })
    } else {
      resultRow = await UserVisualTheme.create(data, { transaction })
    }

    await transaction.commit()
    const userVisualThemeRow = resultRow.get({ plain: true })
    delete userVisualThemeRow.updatedAt

    return userVisualThemeRow
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const getUserVisualTheme = async (userId: string) => {
  const transaction = await sequelize.transaction()

  try {
    const user = await User.findByPk(userId, { transaction })
    if (!user) {
      throw new Error(USER_NOT_FOUND)
    }

    const userVisualTheme = await UserVisualTheme.findOne({
      where: { userId },
      include: VisualTheme,
      transaction,
    })

    if (!userVisualTheme) {
      return null
    }

    const userVisualThemeData = userVisualTheme.get({ plain: true })
    delete userVisualThemeData.updatedAt
    delete userVisualThemeData.visualTheme.updatedAt

    return userVisualThemeData
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

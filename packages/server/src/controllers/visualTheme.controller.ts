import type { Response } from 'express'
import type {
  CreateVisualThemeRequest,
  DeleteVisualThemeRequest,
  GetVisualThemeRequest,
  SetUserVisualThemeRequest,
  GetUserVisualThemeRequest,
} from '../types'
import { handleError } from '../utils'
import {
  createVisualTheme,
  getVisualThemes,
  deleteVisualTheme,
  setUserVisualTheme,
  getUserVisualTheme,
} from '../services'

export const createVisualThemeController = async (req: CreateVisualThemeRequest, res: Response) => {
  try {
    const comment = await createVisualTheme(req.body)
    return res.status(201).json(comment)
  } catch (error) {
    return handleError(error, res, 'error creating visualTheme')
  }
}

export const getVisualThemesController = async (req: GetVisualThemeRequest, res: Response) => {
  try {
    const vusualThemes = await getVisualThemes(req.query)
    return res.json(vusualThemes)
  } catch (error) {
    return handleError(error, res, 'error fetching visualThemes')
  }
}

export const deleteVisualThemeController = async (req: DeleteVisualThemeRequest, res: Response) => {
  try {
    await deleteVisualTheme(req.params.visualThemeId)
    return res.status(204).send()
  } catch (error) {
    return handleError(error, res, 'error deleting visualTheme')
  }
}

export const setUserVisualThemeController = async (
  req: SetUserVisualThemeRequest,
  res: Response
) => {
  try {
    const comment = await setUserVisualTheme(req.body)
    return res.status(201).json(comment)
  } catch (error) {
    return handleError(error, res, "error setting user's visualTheme")
  }
}

export const getUserVisualThemeController = async (
  req: GetUserVisualThemeRequest,
  res: Response
) => {
  try {
    const visualTheme = await getUserVisualTheme(req.params.userId)
    return res.status(201).json(visualTheme)
  } catch (error) {
    return handleError(error, res, "error getting user's visualTheme")
  }
}

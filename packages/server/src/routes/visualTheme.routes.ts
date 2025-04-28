import express from 'express'
import {
  createVisualThemeController,
  deleteVisualThemeController,
  getVisualThemesController,
  setUserVisualThemeController,
  getUserVisualThemeController,
} from '../controllers'
import { validateRequestData } from '../middlewares'
import {
  visualThemeIdSchema,
  createVisualThemeSchema,
  getVisualThemesSchema,
  setUserVisualThemeSchema,
  getUserVisualThemeSchema,
} from '../schemas'

const router = express.Router()

router.get(
  '/',
  validateRequestData(getVisualThemesSchema, 'query'),
  getVisualThemesController as unknown as express.RequestHandler
)
router.post('/', validateRequestData(createVisualThemeSchema), createVisualThemeController)
router.delete(
  '/:visualThemeId',
  validateRequestData(visualThemeIdSchema, 'params'),
  deleteVisualThemeController
)
router.post('/user', validateRequestData(setUserVisualThemeSchema), setUserVisualThemeController)

router.get(
  '/user/:userId',
  validateRequestData(getUserVisualThemeSchema, 'params'),
  getUserVisualThemeController
)

export default router

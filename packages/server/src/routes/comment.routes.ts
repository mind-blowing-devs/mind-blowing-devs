import express from 'express'
import {
  createCommentController,
  deleteCommentController,
  getCommentsController,
} from '../controllers'
import { validateRequestData } from '../middlewares'
import { commentIdSchema, createCommentSchema, getCommentsSchema } from '../schemas'

const router = express.Router()

router.get(
  '/',
  validateRequestData(getCommentsSchema, 'query'),
  getCommentsController as unknown as express.RequestHandler
)
router.post('/', validateRequestData(createCommentSchema), createCommentController)
router.delete(
  '/:commentId',
  validateRequestData(commentIdSchema, 'params'),
  deleteCommentController
)

export default router

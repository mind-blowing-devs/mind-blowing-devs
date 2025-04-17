import express from 'express'
import {
  createReplyController,
  deleteReplyController,
  getRepliesController,
} from '../controllers'
import { validateRequestData } from '../middlewares'
import { createReplySchema, getRepliesSchema, replyIdSchema } from '../schemas'

const router = express.Router()

router.post('/', validateRequestData(createReplySchema), createReplyController)
router.get(
  '/',
  validateRequestData(getRepliesSchema, 'query'),
  getRepliesController as unknown as express.RequestHandler
)
router.delete(
  '/:replyId',
  validateRequestData(replyIdSchema),
  deleteReplyController
)

export default router

import express from 'express'
import { createComment, getComments } from '../controllers'
import { validateRequestData } from '../middlewares'
import {
  createCommentSchema,
  getCommentsSchema,
} from '../schemas/comment.schema'

const router = express.Router()

router.get('/', validateRequestData(getCommentsSchema, 'query'), getComments)
router.post('/', validateRequestData(createCommentSchema), createComment)

export default router

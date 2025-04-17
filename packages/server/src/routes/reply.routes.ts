import express from 'express'
import { createReplyController } from '../controllers'
import { validateRequestData } from '../middlewares'
import { createReplySchema } from '../schemas/reply.schema'

const router = express.Router()

router.post('/', validateRequestData(createReplySchema), createReplyController)

export default router

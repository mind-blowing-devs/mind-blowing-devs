import express from 'express'
import { createReply } from '../controllers'
import { validateRequestData } from '../middlewares'
import { createReplySchema } from '../schemas/reply.schema'

const router = express.Router()

router.post('/', validateRequestData(createReplySchema), createReply)

export default router

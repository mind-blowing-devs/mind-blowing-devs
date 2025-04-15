import express from 'express'
import { getAllTopics, getTopicById, createTopic } from '../controllers'
import { createTopicSchema } from '../schemas/topic.schema'
import { validateBody } from '../middlewares/validateBody'

const router = express.Router()

router.get('/', getAllTopics)
router.get('/:id', getTopicById)
router.post('/', validateBody(createTopicSchema), createTopic)

export default router

import express from 'express'
import { getAllTopics, getTopicById, createTopic } from '../controllers'
import { createTopicSchema } from '../schemas/topic.schema'
import { validateRequestData } from '../middlewares'

const router = express.Router()

router.get('/', getAllTopics)
router.get('/:id', getTopicById)
router.post('/', validateRequestData(createTopicSchema), createTopic)

export default router

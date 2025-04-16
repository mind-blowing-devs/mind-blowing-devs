import express from 'express'
import {
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
} from '../controllers'
import { createTopicSchema, topicIdSchema, updateTopicSchema } from '../schemas'
import { validateRequestData } from '../middlewares'

const router = express.Router()

router.get('/', getAllTopics)
router.get('/:id', validateRequestData(topicIdSchema, 'params'), getTopicById)
router.post('/', validateRequestData(createTopicSchema), createTopic)
router.put(
  '/:id',
  validateRequestData(topicIdSchema, 'params'),
  validateRequestData(updateTopicSchema),
  updateTopic
)
router.delete('/:id', validateRequestData(topicIdSchema, 'params'), deleteTopic)

export default router

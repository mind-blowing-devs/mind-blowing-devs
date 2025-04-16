import express from 'express'
import {
  getAllTopicsController,
  getTopicByIdController,
  createTopicController,
  updateTopicController,
  deleteTopicController,
} from '../controllers'
import { createTopicSchema, topicIdSchema, updateTopicSchema } from '../schemas'
import { validateRequestData } from '../middlewares'

const router = express.Router()

router.get('/', getAllTopicsController)
router.get(
  '/:id',
  validateRequestData(topicIdSchema, 'params'),
  getTopicByIdController
)
router.post('/', validateRequestData(createTopicSchema), createTopicController)
router.put(
  '/:id',
  validateRequestData(topicIdSchema, 'params'),
  validateRequestData(updateTopicSchema),
  updateTopicController
)
router.delete(
  '/:id',
  validateRequestData(topicIdSchema, 'params'),
  deleteTopicController
)

export default router

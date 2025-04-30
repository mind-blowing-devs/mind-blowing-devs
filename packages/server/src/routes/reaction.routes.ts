import express from 'express'
import {
  getReactionsController,
  addReactionController,
  removeReactionController,
} from '../controllers'
import { validateRequestData } from '../middlewares'
import { getReactionsSchema, addReactionSchema, removeReactionSchema } from '../schemas'

const router = express.Router()

router.get('/', validateRequestData(getReactionsSchema, 'query'), getReactionsController)

router.post('/', validateRequestData(addReactionSchema, 'body'), addReactionController)

router.delete('/:id', validateRequestData(removeReactionSchema, 'params'), removeReactionController)

export default router

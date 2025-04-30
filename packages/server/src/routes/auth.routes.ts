import express from 'express'
import { createUserController } from '../controllers'
import { validateRequestData } from '../middlewares'
import { createUserSchema } from '../schemas'

const router = express.Router()

router.post('/signUp', validateRequestData(createUserSchema), createUserController)
export default router

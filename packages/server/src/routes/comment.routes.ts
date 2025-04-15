import express from 'express'
import * as commentController from '../controllers/comment.controller'

const router = express.Router()

router.post('/', commentController.createComment)

export default router

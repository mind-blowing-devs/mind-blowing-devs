import express from 'express'
import * as replyController from '../controllers/reply.controller'

const router = express.Router()

router.post('/', replyController.createReply)
router.put('/:id', replyController.updateReply)
router.delete('/:id', replyController.deleteReply)

export default router

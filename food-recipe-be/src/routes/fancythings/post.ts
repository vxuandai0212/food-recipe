import express from 'express'
import { validate } from 'middlewares/index'
import validation from 'validations/fancythings/post'
import controller from 'controllers/fancythings/post'

const router = express.Router()
router.post('/', validate(validation.upsert), controller.upsert)
router.post('/get', validate(validation.get), controller.get)
router.post('/get-all', validate(validation.getAll), controller.getAll)
router.post('/delete', validate(validation.deletePost), controller.deletePost)

export default router

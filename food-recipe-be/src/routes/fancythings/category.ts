import express from 'express'
import { validate } from 'middlewares/index'
import validation from 'validations/fancythings/category'
import controller from 'controllers/fancythings/category'

const router = express.Router()
router.post('/', validate(validation.upsert), controller.upsert)
router.post('/get-all', validate(validation.getAll), controller.getAll)
router.post('/get-active', controller.getActive)
router.post('/delete', validate(validation.deleteCategory), controller.deleteCategory)

export default router

import express from 'express'
import { validate } from 'middlewares/index'
import keywordValidation from 'validations/keyword'
import keywordController from 'controllers/keyword'

const router = express.Router()
router.post('/add', validate(keywordValidation.insert), keywordController.insert)
router.post('/get-all', validate(keywordValidation.getAll), keywordController.getAll)

export default router

import express from 'express'
import { validate } from 'middlewares/index'
import nutritionValidation from 'validations/nutrition'
import nutritionController from 'controllers/nutrition'

const router = express.Router()
router.post('/', validate(nutritionValidation.upsert), nutritionController.upsert)
router.post('/get-all', validate(nutritionValidation.getAll), nutritionController.getAll)
router.post('/delete', validate(nutritionValidation.deleteNutrition), nutritionController.deleteNutrition)

export default router

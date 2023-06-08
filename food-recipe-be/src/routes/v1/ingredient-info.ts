import express from 'express'
import { validate } from 'middlewares/index'
import ingredientInfoValidation from 'validations/ingredient-info'
import ingredientInfoController from 'controllers/ingredient-info'

const router = express.Router()
router.post('/', validate(ingredientInfoValidation.upsert), ingredientInfoController.upsert)
router.post('/get-all', validate(ingredientInfoValidation.getAll), ingredientInfoController.getAll)
router.post('/delete', validate(ingredientInfoValidation.deleteIngredientInfo), ingredientInfoController.deleteIngredientInfo)

export default router

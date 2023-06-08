import express from 'express'
import { validate } from 'middlewares/index'
import ingredientNutritionValidation from 'validations/ingredient-nutrition'
import ingredientNutritionController from 'controllers/ingredient-nutrition'

const router = express.Router()
router.post('/', validate(ingredientNutritionValidation.upsert), ingredientNutritionController.upsert)
router.post('/get-all', validate(ingredientNutritionValidation.getAll), ingredientNutritionController.getAll)
router.post('/delete', validate(ingredientNutritionValidation.deleteIngredientNutrition), ingredientNutritionController.deleteIngredientNutrition)

export default router

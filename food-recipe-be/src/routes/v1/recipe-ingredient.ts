import express from 'express'
import { validate } from 'middlewares/index'
import recipeIngredientValidation from 'validations/recipe-ingredient'
import recipeIngredientController from 'controllers/recipe-ingredient'

const router = express.Router()
router.post('/', validate(recipeIngredientValidation.upsert), recipeIngredientController.upsert)
router.post('/get-all', validate(recipeIngredientValidation.getAll), recipeIngredientController.getAll)
router.post('/delete', validate(recipeIngredientValidation.deleteRecipeIngredient), recipeIngredientController.deleteRecipeIngredient)

export default router

import express from 'express'
import { validate } from 'middlewares/index'
import recipeKeywordValidation from 'validations/recipe-keyword'
import recipeKeywordController from 'controllers/recipe-keyword'

const router = express.Router()
router.post('/add', validate(recipeKeywordValidation.insert), recipeKeywordController.insert)
router.post('/get-all', validate(recipeKeywordValidation.getAll), recipeKeywordController.getAll)
router.post('/delete', validate(recipeKeywordValidation.deleteRecipeKeyword), recipeKeywordController.deleteRecipeKeyword)

export default router

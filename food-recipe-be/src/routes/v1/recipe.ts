import express from 'express'
import { validate } from 'middlewares/index'
import recipeValidation from 'validations/recipe'
import recipeController from 'controllers/recipe'

const router = express.Router()
router.post('/', validate(recipeValidation.upsert), recipeController.upsert)
router.post('/get-all', validate(recipeValidation.getAll), recipeController.getAll)
router.post('/get', validate(recipeValidation.get), recipeController.get)
router.post('/delete', validate(recipeValidation.deleteRecipe), recipeController.deleteRecipe)

export default router

import express from 'express'
import { validate } from 'middlewares/index'
import ingredientValidation from 'validations/ingredient'
import ingredientController from 'controllers/ingredient'

const router = express.Router()
router.post('/', validate(ingredientValidation.upsert), ingredientController.upsert)
router.post('/get-all', validate(ingredientValidation.getAll), ingredientController.getAll)
router.post('/get', validate(ingredientValidation.get), ingredientController.get)
router.post('/delete', validate(ingredientValidation.deleteIngredient), ingredientController.deleteIngredient)

export default router

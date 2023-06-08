import express from 'express'
import { validate } from 'middlewares/index'
import validation from 'validations/mobile'
import controller from 'controllers/mobile'

const router = express.Router()
router.post('/recipes/recent', validate(validation.recent), controller.recent)
router.post('/recipes/search', validate(validation.search), controller.search)
router.post('/recipes/get', validate(validation.recipeGet), controller.recipeGet)
router.post('/ads/views', validate(validation.adView), controller.adView)

export default router

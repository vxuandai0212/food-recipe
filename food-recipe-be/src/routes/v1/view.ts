import express from 'express'
import { validate } from 'middlewares/index'
import viewValidation from 'validations/view'
import viewController from 'controllers/view'

const router = express.Router()
router.post('/recipes/get-all', validate(viewValidation.recipe), viewController.recipe)
router.post('/keywords/get-all', validate(viewValidation.keyword), viewController.keyword)
router.post('/native-ad/get-all', validate(viewValidation.nativeAd), viewController.nativeAd)
router.post('/admob/get-all', validate(viewValidation.admob), viewController.admob)

export default router

import express from 'express'
import { validate } from 'middlewares/index'
import recipeCookEventValidation from 'validations/recipe-cook-event'
import recipeCookEventController from 'controllers/recipe-cook-event'

const router = express.Router()
router.post('/', validate(recipeCookEventValidation.add), recipeCookEventController.add)
router.post('/get-all', validate(recipeCookEventValidation.getAll), recipeCookEventController.getAll)
router.post('/delete', validate(recipeCookEventValidation.deleteRecipeCookEvent), recipeCookEventController.deleteRecipeCookEvent)

export default router

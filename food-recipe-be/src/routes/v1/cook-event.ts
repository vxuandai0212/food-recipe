import express from 'express'
import { validate } from 'middlewares/index'
import cookEventValidation from 'validations/cook-event'
import cookEventController from 'controllers/cook-event'

const router = express.Router()
router.post('/', validate(cookEventValidation.upsert), cookEventController.upsert)
router.post('/get-all', validate(cookEventValidation.getAll), cookEventController.getAll)
router.post('/delete', validate(cookEventValidation.deleteCookEvent), cookEventController.deleteCookEvent)

export default router

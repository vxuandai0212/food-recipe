import express from 'express'
import { validate } from 'middlewares/index'
import adLocationValidation from 'validations/ad-location'
import adLocationController from 'controllers/ad-location'

const router = express.Router()
router.post('/add', validate(adLocationValidation.insert), adLocationController.insert)
router.post('/get-all', validate(adLocationValidation.getAll), adLocationController.getAll)
router.post('/delete', validate(adLocationValidation.deleteAdLocation), adLocationController.deleteAdLocation)

export default router

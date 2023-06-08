import express from 'express'
import { validate } from 'middlewares/index'
import adValidation from 'validations/ad'
import adController from 'controllers/ad'

const router = express.Router()
router.post('/', validate(adValidation.upsert), adController.upsert)
router.post('/get', validate(adValidation.get), adController.get)
router.post('/get-all', validate(adValidation.getAll), adController.getAll)
router.post('/delete', validate(adValidation.deleteAd), adController.deleteAd)
router.post('/ad-view', validate(adValidation.adView), adController.adView)
router.post('/ad-view/get', validate(adValidation.adViewGet), adController.adViewGet)
router.post('/ad-view-log', validate(adValidation.adViewLog), adController.adViewLog)

export default router

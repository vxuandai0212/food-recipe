import express from 'express'
import { validate } from 'middlewares/index'
import storageValidation from 'validations/storage'
import storageController from 'controllers/storage'

const router = express.Router()
router.post('/', validate(storageValidation.upsert), storageController.upsert)
router.post('/get-all', validate(storageValidation.getAll), storageController.getAll)
router.post('/delete', validate(storageValidation.deleteStorage), storageController.deleteStorage)

export default router

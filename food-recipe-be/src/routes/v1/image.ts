import express from 'express'
import { validate } from 'middlewares/index'
import imageValidation from 'validations/image'
import imageController from 'controllers/image'
import multer from 'multer'
const upload = multer()

const router = express.Router()
router.post('/upload', upload.single('file'), imageController.upload)
router.post('/get-all', validate(imageValidation.getAll), imageController.getAll)
router.post('/set-cover', validate(imageValidation.setCover), imageController.setCover)
router.post('/delete', validate(imageValidation.deleteImage), imageController.deleteImage)

export default router

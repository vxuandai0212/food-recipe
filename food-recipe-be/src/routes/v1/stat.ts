import express from 'express'
import statController from 'controllers/stat'

const router = express.Router()
router.post('/overview', statController.overview)

export default router

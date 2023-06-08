import express from 'express'
import { validate } from 'middlewares/index'
import adCustomerValidation from 'validations/ad-customer'
import adCustomerController from 'controllers/ad-customer'

const router = express.Router()
router.post('/', validate(adCustomerValidation.upsert), adCustomerController.upsert)
router.post('/get', validate(adCustomerValidation.get), adCustomerController.get)
router.post('/get-all', validate(adCustomerValidation.getAll), adCustomerController.getAll)
router.post('/delete', validate(adCustomerValidation.deleteAdCustomer), adCustomerController.deleteAdCustomer)

export default router

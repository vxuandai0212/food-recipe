import Joi from 'joi'
import { MIN_PAGE, MIN_LIMIT, MAX_LIMIT, MAX_LENGTH_AD_CUSTOMER_NAME, MAX_LENGTH_PHONE, MAX_LENGTH_EMAIL, MAX_LENGTH_WEBSITE } from 'constants/constraint'

const upsert = {
  body: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().allow('').max(MAX_LENGTH_AD_CUSTOMER_NAME),
    phone: Joi.string().required().max(MAX_LENGTH_PHONE),
    email: Joi.string().allow('').max(MAX_LENGTH_EMAIL),
    website: Joi.string().allow('').max(MAX_LENGTH_WEBSITE)
  })
}

const getAll = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    searchKeyword: Joi.string().max(MAX_LENGTH_WEBSITE)
  })
}

const get = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const deleteAdCustomer = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const adCustomerValidation = {
  upsert,
  getAll,
  get,
  deleteAdCustomer
}

export default adCustomerValidation

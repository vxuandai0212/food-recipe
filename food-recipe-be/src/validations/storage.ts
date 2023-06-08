import Joi from 'joi'
import { MIN_PAGE, MIN_LIMIT, MAX_LIMIT, MAX_LENGTH_STORAGE_CLOUD_NAME, MAX_LENGTH_STORAGE_API_KEY, MAX_LENGTH_STORAGE_API_SECRET } from 'constants/constraint'
import { VALID_STORAGE_IS_DEFAULT } from 'constants/params'

const upsert = {
  body: Joi.object().keys({
    id: Joi.number(),
    cloudName: Joi.string().required().max(MAX_LENGTH_STORAGE_CLOUD_NAME),
    apiKey: Joi.string().required().max(MAX_LENGTH_STORAGE_API_KEY),
    apiSecret: Joi.string().required().max(MAX_LENGTH_STORAGE_API_SECRET),
    isDefault: Joi.number().required().valid(...VALID_STORAGE_IS_DEFAULT)
  })
}

const getAll = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    searchKeyword: Joi.string().max(MAX_LENGTH_STORAGE_CLOUD_NAME)
  })
}

const deleteStorage = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.number())
  })
}

const storageValidation = {
  upsert,
  getAll,
  deleteStorage
}

export default storageValidation

import Joi from 'joi'
import { MIN_PAGE, MIN_LIMIT, MAX_LIMIT, MAX_LENGTH_AD_NAME, MAX_LENGTH_LINK } from 'constants/constraint'
import { VALID_AD_CATEGORY, VALID_AD_PAYED, VALID_AD_STATUS } from 'constants/params'

const upsert = {
  body: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required().max(MAX_LENGTH_AD_NAME),
    link: Joi.string().allow(null).max(MAX_LENGTH_LINK),
    adCustomerId: Joi.number().required(),
    price: Joi.number(),
    validFromDate: Joi.date().allow(null),
    validToDate: Joi.date().greater(Joi.ref('validFromDate')).allow(null),
    payStatus: Joi.number().valid(...VALID_AD_PAYED),
    status: Joi.number().required().valid(...VALID_AD_STATUS),
    type: Joi.number().required().valid(...VALID_AD_CATEGORY)
  })
}

const getAll = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    searchKeyword: Joi.string().max(MAX_LENGTH_LINK),
    adCustomerId: Joi.number()
  })
}

const get = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const deleteAd = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const adView = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    adId: Joi.number().required()
  })
}

const adViewGet = {
  body: Joi.object().keys({
    adId: Joi.number().required(),
    recipeId: Joi.number().required()
  })
}

const adViewLog = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    adId: Joi.number().required(),
    recipeId: Joi.number().required()
  })
}

const adValidation = {
  upsert,
  get,
  getAll,
  deleteAd,
  adView,
  adViewGet,
  adViewLog
}

export default adValidation

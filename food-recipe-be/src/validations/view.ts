import Joi from 'joi'
import { MIN_PAGE, MIN_LIMIT, MAX_LIMIT, CURRENT_DATE, MAX_DAY } from 'constants/constraint'

const recipe = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    fromDate: Joi.date().required().min(CURRENT_DATE.setDate(CURRENT_DATE.getDate() - MAX_DAY)),
    toDate: Joi.date().required().greater(Joi.ref('fromDate'))
  })
}

const keyword = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    fromDate: Joi.date().required().min(CURRENT_DATE.setDate(CURRENT_DATE.getDate() - MAX_DAY)),
    toDate: Joi.date().required().greater(Joi.ref('fromDate'))
  })
}

const nativeAd = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    fromDate: Joi.date().required().min(CURRENT_DATE.setDate(CURRENT_DATE.getDate() - MAX_DAY)),
    toDate: Joi.date().required().greater(Joi.ref('fromDate'))
  })
}

const admob = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    fromDate: Joi.date().required().min(CURRENT_DATE.setDate(CURRENT_DATE.getDate() - MAX_DAY)),
    toDate: Joi.date().required().greater(Joi.ref('fromDate'))
  })
}

const viewValidation = {
  recipe,
  keyword,
  nativeAd,
  admob
}

export default viewValidation

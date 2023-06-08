import Joi from 'joi'
import { MIN_PAGE, MIN_LIMIT, MAX_LIMIT, MAX_LENGTH_LINK } from 'constants/constraint'

const recent = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT)
  })
}

const search = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    searchKeyword: Joi.string().max(MAX_LENGTH_LINK)
  })
}

const recipeGet = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const adView = {
  body: Joi.object().keys({
    recipeId: Joi.number().required(),
    adId: Joi.number().required()
  })
}

const validation = {
  recent,
  search,
  recipeGet,
  adView
}

export default validation

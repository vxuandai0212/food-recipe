import Joi from 'joi'
import { MIN_PAGE, MIN_LIMIT, MAX_LIMIT, MAX_LENGTH_COOK_EVENT_NAME } from 'constants/constraint'

const upsert = {
  body: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required().max(MAX_LENGTH_COOK_EVENT_NAME)
  })
}

const getAll = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    searchKeyword: Joi.string().max(MAX_LENGTH_COOK_EVENT_NAME)
  })
}

const deleteCookEvent = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.number())
  })
}

const cookEventValidation = {
  upsert,
  getAll,
  deleteCookEvent
}

export default cookEventValidation

import { MAX_LENGTH_LINK, MAX_LIMIT, MIN_LIMIT, MIN_PAGE } from 'constants/constraint'
import Joi from 'joi'

const insert = {
  body: Joi.object().keys({
    name: Joi.string().required().max(MAX_LENGTH_LINK)
  })
}

const getAll = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    searchKeyword: Joi.string().max(MAX_LENGTH_LINK)
  })
}

const keywordValidation = {
  insert,
  getAll
}

export default keywordValidation

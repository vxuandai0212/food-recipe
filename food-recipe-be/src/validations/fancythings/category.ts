import Joi from 'joi'
import { MIN_PAGE, MIN_LIMIT, MAX_LIMIT, MAX_LENGTH_FT_CATEGORY_NAME } from 'constants/constraint'
import { VALID_FT_CATEGORY_LEVEL } from 'constants/params'

const upsert = {
  body: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required().max(MAX_LENGTH_FT_CATEGORY_NAME),
    parentId: Joi.number().allow(null),
    level: Joi.number().required().valid(...VALID_FT_CATEGORY_LEVEL)
  })
}

const getAll = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    parentId: Joi.number(),
    level: Joi.number().valid(...VALID_FT_CATEGORY_LEVEL)
  })
}

const deleteCategory = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const validation = {
  upsert,
  getAll,
  deleteCategory
}

export default validation

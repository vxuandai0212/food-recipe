import Joi from 'joi'
import { MIN_PAGE, MIN_LIMIT, MAX_LIMIT, MAX_LENGTH_FT_POST_TITLE } from 'constants/constraint'

const upsert = {
  body: Joi.object().keys({
    id: Joi.number(),
    title: Joi.string().required().max(MAX_LENGTH_FT_POST_TITLE),
    categoryId: Joi.number(),
    subCategoryId: Joi.number(),
    rawContent: Joi.string(),
    content: Joi.string()
  })
}

const get = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const getAll = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    searchKeyword: Joi.string().max(MAX_LENGTH_FT_POST_TITLE),
    categoryId: Joi.number(),
    subCategoryId: Joi.number()
  })
}

const deletePost = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const validation = {
  upsert,
  get,
  getAll,
  deletePost
}

export default validation

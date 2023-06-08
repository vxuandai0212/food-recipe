import Joi from 'joi'
import { MIN_PAGE, MIN_LIMIT, MAX_LIMIT, MAX_LENGTH_NUTRITION_NAME } from 'constants/constraint'

const upsert = {
  body: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required().max(MAX_LENGTH_NUTRITION_NAME)
  })
}

const getAll = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    searchKeyword: Joi.string().max(MAX_LENGTH_NUTRITION_NAME)
  })
}

const deleteNutrition = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.number())
  })
}

const nutritionValidation = {
  upsert,
  getAll,
  deleteNutrition
}

export default nutritionValidation

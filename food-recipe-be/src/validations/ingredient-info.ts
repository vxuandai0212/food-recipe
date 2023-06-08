import Joi from 'joi'
import { MAX_LENGTH_INGREDIENT_INFO_TITLE, MAX_LENGTH_INGREDIENT_INFO_DESCRIPTION } from 'constants/constraint'
import { VALID_INGREDIENT_INFO_TYPE } from 'constants/params'

const upsert = {
  body: Joi.object().keys({
    id: Joi.number(),
    ingredientId: Joi.number().required(),
    title: Joi.string().max(MAX_LENGTH_INGREDIENT_INFO_TITLE),
    description: Joi.string().allow(null).allow('').max(MAX_LENGTH_INGREDIENT_INFO_DESCRIPTION),
    type: Joi.number().required().valid(...VALID_INGREDIENT_INFO_TYPE)
  })
}

const getAll = {
  body: Joi.object().keys({
    ingredientId: Joi.number().required(),
    types: Joi.array().required().items(Joi.number())
  })
}

const deleteIngredientInfo = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const ingredientInfoValidation = {
  upsert,
  getAll,
  deleteIngredientInfo
}

export default ingredientInfoValidation

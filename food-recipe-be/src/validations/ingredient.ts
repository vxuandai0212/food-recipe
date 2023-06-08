import Joi from 'joi'
import { MIN_PAGE, MIN_LIMIT, MAX_LIMIT, MAX_LENGTH_INGREDIENT_NAME, MAX_LENGTH_DISPLAY_PRICE, MAX_LENGTH_DISPLAY_PRICE_UNIT } from 'constants/constraint'

const upsert = {
  body: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required().max(MAX_LENGTH_INGREDIENT_NAME),
    price: Joi.number().required().greater(0),
    displayPrice: Joi.string().required().max(MAX_LENGTH_DISPLAY_PRICE),
    displayPriceUnit: Joi.string().required().max(MAX_LENGTH_DISPLAY_PRICE_UNIT)
  })
}

const getAll = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    searchKeyword: Joi.string().max(MAX_LENGTH_INGREDIENT_NAME)
  })
}

const get = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const deleteIngredient = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const ingredientValidation = {
  upsert,
  getAll,
  get,
  deleteIngredient
}

export default ingredientValidation

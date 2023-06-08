import { MAX_LENGTH_DISPLAY_QUANTITY, MAX_LENGTH_DISPLAY_QUANTITY_UNIT } from 'constants/constraint'
import Joi from 'joi'

const upsert = {
  body: Joi.object().keys({
    id: Joi.number(),
    recipeId: Joi.number().required(),
    ingredientId: Joi.number().required(),
    quantity: Joi.number().required(),
    displayQuantity: Joi.string().required().max(MAX_LENGTH_DISPLAY_QUANTITY),
    displayQuantityUnit: Joi.string().required().max(MAX_LENGTH_DISPLAY_QUANTITY_UNIT)
  })
}

const getAll = {
  body: Joi.object().keys({
    recipeId: Joi.number().required()
  })
}

const deleteRecipeIngredient = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const recipeIngredientValidation = {
  upsert,
  getAll,
  deleteRecipeIngredient
}

export default recipeIngredientValidation

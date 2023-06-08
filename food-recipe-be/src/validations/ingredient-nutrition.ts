import Joi from 'joi'

const upsert = {
  body: Joi.object().keys({
    id: Joi.number(),
    ingredientId: Joi.number().required(),
    nutritionId: Joi.number().required(),
    nutritionValue: Joi.number().required().greater(0)
  })
}

const getAll = {
  body: Joi.object().keys({
    ingredientId: Joi.number().required()
  })
}

const deleteIngredientNutrition = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const ingredientNutritionValidation = {
  upsert,
  getAll,
  deleteIngredientNutrition
}

export default ingredientNutritionValidation

import Joi from 'joi'
import { MIN_PAGE, MIN_LIMIT, MAX_LIMIT, MAX_LENGTH_RECIPE_NAME, MAX_LENGTH_LINK, MAX_LENGTH_RECIPE_INSTRUCTION, MAX_LENGTH_RECIPE_INSTRUCTION_DESIGN } from 'constants/constraint'

const upsert = {
  body: Joi.object().keys({
    id: Joi.number(),
    name: Joi.string().required().max(MAX_LENGTH_RECIPE_NAME),
    cookTime: Joi.number().required().greater(0),
    instruction: Joi.string().max(MAX_LENGTH_RECIPE_INSTRUCTION),
    instructionDesign: Joi.string().max(MAX_LENGTH_RECIPE_INSTRUCTION_DESIGN)
  })
}

const getAll = {
  body: Joi.object().keys({
    page: Joi.number().required().min(MIN_PAGE),
    limit: Joi.number().required().min(MIN_LIMIT).max(MAX_LIMIT),
    searchKeyword: Joi.string().max(MAX_LENGTH_LINK)
  })
}

const get = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const deleteRecipe = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const recipeValidation = {
  upsert,
  getAll,
  get,
  deleteRecipe
}

export default recipeValidation

import { MAX_LENGTH_FAVORITE_KEYWORD_KEY } from 'constants/constraint'
import Joi from 'joi'

const insert = {
  body: Joi.object().keys({
    keywordName: Joi.string().required().max(MAX_LENGTH_FAVORITE_KEYWORD_KEY),
    recipeId: Joi.number().required()
  })
}

const getAll = {
  body: Joi.object().keys({
    recipeId: Joi.number().required()
  })
}

const deleteRecipeKeyword = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const recipeKeywordValidation = {
  getAll,
  insert,
  deleteRecipeKeyword
}

export default recipeKeywordValidation

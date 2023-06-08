import { MAX_LENGTH_COOK_EVENT_NAME } from 'constants/constraint'
import Joi from 'joi'

const add = {
  body: Joi.object().keys({
    recipeId: Joi.number().required(),
    cookEventName: Joi.string().required().max(MAX_LENGTH_COOK_EVENT_NAME)
  })
}

const getAll = {
  body: Joi.object().keys({
    searchKeyword: Joi.string().max(MAX_LENGTH_COOK_EVENT_NAME),
    recipeId: Joi.number().required()
  })
}

const deleteRecipeCookEvent = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const recipeCookEventValidation = {
  add,
  getAll,
  deleteRecipeCookEvent
}

export default recipeCookEventValidation

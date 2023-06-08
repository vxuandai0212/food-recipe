import Joi from 'joi'

const insert = {
  body: Joi.object().keys({
    adId: Joi.number().required(),
    recipeId: Joi.number().required()
  })
}

const getAll = {
  body: Joi.object().keys({
    recipeId: Joi.number().required()
  })
}

const deleteAdLocation = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const adLocationValidation = {
  getAll,
  insert,
  deleteAdLocation
}

export default adLocationValidation

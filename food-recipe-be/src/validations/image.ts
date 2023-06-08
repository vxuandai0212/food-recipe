import Joi from 'joi'
import { MAX_LENGTH_IMAGE_PUBLIC_ID } from 'constants/constraint'
import { VALID_CONTENT_IMAGE_IS_COVER, VALID_CONTENT_IMAGE_OBJECT_TYPE } from 'constants/params'

const upload = {
  body: Joi.object().keys({
    objectId: Joi.number().required(),
    objectType: Joi.number().required().valid(...VALID_CONTENT_IMAGE_OBJECT_TYPE),
    payload: Joi.string().required(),
    isCover: Joi.number().required().valid(...VALID_CONTENT_IMAGE_IS_COVER),
    publicId: Joi.string().required().max(MAX_LENGTH_IMAGE_PUBLIC_ID),
    storageId: Joi.number().required()
  })
}

const getAll = {
  body: Joi.object().keys({
    objectId: Joi.number().required(),
    objectType: Joi.number().required().valid(...VALID_CONTENT_IMAGE_OBJECT_TYPE)
  })
}

const setCover = {
  body: Joi.object().keys({
    imageId: Joi.number().required(),
    recipeId: Joi.number().required()
  })
}

const deleteImage = {
  body: Joi.object().keys({
    id: Joi.number().required()
  })
}

const imageValidation = {
  upload,
  getAll,
  deleteImage,
  setCover
}

export default imageValidation

import { getCustomRepository } from 'typeorm'
import {
  ImageRepository,
  ContentImageRepository
} from 'repositories/index'
import { ApiError } from 'utils/ApiError'
import httpStatus from 'http-status'
import { v2 } from 'cloudinary'
import { v4 as uuidv4 } from 'uuid'
import { ContentImage, Storage } from 'entity/index'
import { CONTENT_IMAGE_IS_COVER_TYPE, CONTENT_IMAGE_OBJECT_TYPE } from 'constants/entity'
import { storageService } from '.'

const upload = async (req: any) => {
  const { file, body } = req
  const { objectId, objectType, isCover } = body
  const { id, cloudName, apiKey, apiSecret } = await storageService.getDefault()
  const publicId = uuidv4()
  v2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  })
  return new Promise((resolve) => {
    v2.uploader.upload_stream({ resource_type: 'image', public_id: publicId, overwrite: true },
      async function(error, result) {
        if (error) {
          throw new ApiError(httpStatus.BAD_REQUEST, error.message)
        }
        const image = await insert({ publicId, storageId: id, isCover, objectId, objectType })
        resolve({ id: image.id, publicId, cloudName })
      }).end(file.buffer)
  })
}

const insert = async (payload: any) => {
  const { publicId, storageId, isCover, objectId, objectType } = payload
  const imageRepository = getCustomRepository(ImageRepository)
  const image = await imageRepository.create()
  image.publicId = publicId
  image.storageId = storageId
  await imageRepository.save(image)

  if (isCover === CONTENT_IMAGE_IS_COVER_TYPE.ENABLE && objectType === CONTENT_IMAGE_OBJECT_TYPE.RECIPE) {
    await unsetIsCoverRecipeImage(objectId)
  }

  const contentImageRepository = getCustomRepository(ContentImageRepository)

  if (objectType === CONTENT_IMAGE_OBJECT_TYPE.INGREDIENT) {
    const existContentImage = await contentImageRepository.findOne({ objectId, objectType })
    if (!existContentImage) {
      const contentImage = await contentImageRepository.create()
      contentImage.imageId = image.id
      contentImage.isCover = isCover
      contentImage.objectId = objectId
      contentImage.objectType = objectType
      await contentImageRepository.save(contentImage)
    }
  } else if (objectType === CONTENT_IMAGE_OBJECT_TYPE.FT_POST_THUMBNAIL) {
    const contentImage = await contentImageRepository.create()
    contentImage.imageId = image.id
    contentImage.isCover = 0
    contentImage.objectId = objectId
    contentImage.objectType = objectType
    await contentImageRepository.save(contentImage)
  } else {
    const contentImage = await contentImageRepository.create()
    contentImage.imageId = image.id
    contentImage.isCover = isCover
    contentImage.objectId = objectId
    contentImage.objectType = objectType
    await contentImageRepository.save(contentImage)
  }

  return image
}

const unsetIsCoverRecipeImage = async (objectId: any) => {
  const contentImageRepository = getCustomRepository(ContentImageRepository)
  const query = contentImageRepository.createQueryBuilder()
    .update()
    .set({ isCover: CONTENT_IMAGE_IS_COVER_TYPE.DISABLE })
    .where('objectId = :objectId and objectType = :objectType', { objectId, objectType: CONTENT_IMAGE_OBJECT_TYPE.RECIPE })

  await query.execute()
}

const getIngredientImage = async (id: any) => {
  const imageRepository = getCustomRepository(ImageRepository)
  const items = await imageRepository
    .createQueryBuilder('i')
    .innerJoin(ContentImage, 'ci', 'ci.imageId = i.id')
    .innerJoin(Storage, 's', 's.id = i.storageId')
    .select('i.id', 'id')
    .addSelect('i.publicId', 'publicId')
    .addSelect('s.cloudName', 'cloudName')
    .andWhere('ci.objectId = :id', { id })
    .andWhere('ci.objectType = :type', { type: CONTENT_IMAGE_OBJECT_TYPE.INGREDIENT })
    .getRawMany()

  if (items && items.length > 0) {
    return items[0]
  }

  return {}
}

const getFtPostImage = async (id: any) => {
  const imageRepository = getCustomRepository(ImageRepository)
  const items = await imageRepository
    .createQueryBuilder('i')
    .innerJoin(ContentImage, 'ci', 'ci.imageId = i.id')
    .innerJoin(Storage, 's', 's.id = i.storageId')
    .select('i.id', 'id')
    .addSelect('i.publicId', 'publicId')
    .addSelect('s.cloudName', 'cloudName')
    .andWhere('ci.objectId = :id', { id })
    .andWhere('ci.objectType = :type', { type: CONTENT_IMAGE_OBJECT_TYPE.FT_POST_THUMBNAIL })
    .getRawMany()

  if (items && items.length > 0) {
    return items[0]
  }

  return {}
}

const getAdImage = async (id: any) => {
  const imageRepository = getCustomRepository(ImageRepository)
  const items = await imageRepository
    .createQueryBuilder('i')
    .innerJoin(ContentImage, 'ci', 'ci.imageId = i.id')
    .innerJoin(Storage, 's', 's.id = i.storageId')
    .select('i.id', 'id')
    .addSelect('i.publicId', 'publicId')
    .addSelect('s.cloudName', 'cloudName')
    .andWhere('ci.objectId = :id', { id })
    .andWhere('ci.objectType = :type', { type: CONTENT_IMAGE_OBJECT_TYPE.AD })
    .getRawMany()

  if (items && items.length > 0) {
    return items[0]
  }

  return {}
}

const getAll = async (payload: any) => {
  const { objectId, objectType } = payload
  const imageRepository = getCustomRepository(ImageRepository)
  const items = await imageRepository
    .createQueryBuilder('i')
    .innerJoin(ContentImage, 'ci', 'ci.imageId = i.id')
    .innerJoin(Storage, 's', 's.id = i.storageId')
    .select('i.id', 'id')
    .addSelect('i.publicId', 'publicId')
    .addSelect('s.cloudName', 'cloudName')
    .addSelect('ci.isCover', 'isCover')
    .andWhere('ci.objectId = :objectId', { objectId })
    .andWhere('ci.objectType = :objectType', { objectType })
    .getRawMany()

  return items
}

const setCover = async (payload: any) => {
  const { imageId, recipeId } = payload
  await unsetIsCoverRecipeImage(recipeId)
  const contentImageRepository = getCustomRepository(ContentImageRepository)
  const contentImage = await contentImageRepository.findOneOrFail({ imageId })
  contentImage.isCover = CONTENT_IMAGE_IS_COVER_TYPE.ENABLE
  await contentImageRepository.save(contentImage)
}

const deleteImage = async (id: number) => {
  const imageRepository = getCustomRepository(ImageRepository)
  const contentImageRepository = getCustomRepository(ContentImageRepository)
  await contentImageRepository.delete({ imageId: id })
  await imageRepository.delete(id)
}

const imageService = {
  upload,
  getIngredientImage,
  getFtPostImage,
  getAdImage,
  getAll,
  setCover,
  deleteImage
}

export default imageService

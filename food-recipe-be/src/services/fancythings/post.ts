import { getCustomRepository } from 'typeorm'
import {
  FtPostRepository
} from 'repositories/fancythings/post'
import { imageService } from 'services/index'
import { v2 } from 'cloudinary'
import { ContentImage } from 'entity/content-image'
import { CONTENT_IMAGE_OBJECT_TYPE } from 'constants/entity'
import { Image } from 'entity/image'
import { Storage } from 'entity/storage'
import { FtCategory } from 'entity/fancythings'

v2.config({
  cloud_name: 'fit1501040028',
  api_key: '933392669637745',
  api_secret: '1zoGKEuecwuoB1MTdo-9UYjzf80',
  secure: true
})

const insert = async (payload: any) => {
  const postRepository = getCustomRepository(FtPostRepository)
  const current = new Date()
  payload.createdAt = current
  payload.updatedAt = current
  let fresh: any = await postRepository.create()
  fresh = Object.assign({}, payload)
  await postRepository.save(fresh)
  return fresh
}

const update = async (payload: any) => {
  const { id } = payload
  payload.updatedAt = new Date()
  const postRepository = getCustomRepository(FtPostRepository)
  const exist = await postRepository.findOneOrFail(id)
  Object.assign(exist, payload)
  await postRepository.save(exist)
  return exist
}

const getAll = async (payload: any) => {
  const { page, limit, categoryId, subCategoryId, searchKeyword } = payload
  const postRepository = getCustomRepository(FtPostRepository)
  let getAllBaseQuery = postRepository
    .createQueryBuilder('c')
    .leftJoin(
      ContentImage,
      'ci',
      'ci.objectId = c.id and ci.objectType = :type',
      {
        type: CONTENT_IMAGE_OBJECT_TYPE.FT_POST_THUMBNAIL
      }
    )
    .leftJoin(Image, 'i', 'i.id = ci.imageId')
    .leftJoin(Storage, 's', 's.id = i.storageId')
    .leftJoin(FtCategory, 'ftc', 'ftc.id = c.categoryId')
    .leftJoin(FtCategory, 'ftsc', 'ftsc.id = c.subCategoryId')
    .select('c.id', 'id')
    .addSelect('c.title', 'title')
    .addSelect('ftc.name', 'category')
    .addSelect('c.categoryId', 'categoryId')
    .addSelect('c.subCategoryId', 'subCategoryId')
    .addSelect('ftsc.name', 'subCategory')
    .addSelect('i.publicId', 'imagePublicId')
  if (categoryId) {
    getAllBaseQuery = getAllBaseQuery.andWhere('c.categoryId = :categoryId', { categoryId })
  }
  if (subCategoryId) {
    getAllBaseQuery = getAllBaseQuery.andWhere('c.subCategoryId = :subCategoryId', { subCategoryId })
  }
  if (searchKeyword) {
    getAllBaseQuery = getAllBaseQuery.andWhere('c.title LIKE :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  const items = await getAllBaseQuery
    .orderBy('c.updatedAt', 'DESC')
    .offset((page - 1) * limit)
    .limit(limit)
    .getRawMany()

  if (items && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const { imagePublicId } = item
      if (imagePublicId) {
        item.image = v2.url(imagePublicId)
      }
    }
  }

  let countBaseQuery = postRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'total')
  if (categoryId) {
    countBaseQuery = countBaseQuery.andWhere('c.categoryId = :categoryId', { categoryId })
  }
  if (subCategoryId) {
    countBaseQuery = countBaseQuery.andWhere('c.subCategoryId = :subCategoryId', { subCategoryId })
  }
  if (searchKeyword) {
    countBaseQuery = countBaseQuery.andWhere('c.title LIKE :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  const { total } = await countBaseQuery
    .getRawOne()

  return { total, items }
}

const getRelatedPosts = async (id: any) => {
  const postRepository = getCustomRepository(FtPostRepository)
  const getAllBaseQuery = postRepository
    .createQueryBuilder('c')
    .leftJoin(
      ContentImage,
      'ci',
      'ci.objectId = c.id and ci.objectType = :type',
      {
        type: CONTENT_IMAGE_OBJECT_TYPE.FT_POST_THUMBNAIL
      }
    )
    .leftJoin(Image, 'i', 'i.id = ci.imageId')
    .leftJoin(Storage, 's', 's.id = i.storageId')
    .leftJoin(FtCategory, 'ftc', 'ftc.id = c.categoryId')
    .leftJoin(FtCategory, 'ftsc', 'ftsc.id = c.subCategoryId')
    .select('c.id', 'id')
    .addSelect('c.title', 'title')
    .addSelect('ftc.name', 'category')
    .addSelect('ftsc.name', 'subCategory')
    .addSelect('i.publicId', 'imagePublicId')
    .where('c.id != :id', { id })
  const items = await getAllBaseQuery
    .orderBy('c.updatedAt', 'DESC')
    .limit(5)
    .getRawMany()

  if (items && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const { imagePublicId } = item
      if (imagePublicId) {
        item.image = v2.url(imagePublicId)
      }
    }
  }
  return items
}

const get = async (id: number) => {
  const postRepository = getCustomRepository(FtPostRepository)
  const item: any = await postRepository.findOneOrFail(id)
  const image = await imageService.getFtPostImage(id)
  if (image) {
    const { publicId } = image
    item.imageUrl = v2.url(publicId)
    item.image = image
  }
  if (item) {
    const { id } = item
    const relatedArticles = await getRelatedPosts(id)
    item.relatedArticles = relatedArticles
  }
  return item
}

const deletePost = async (id: any) => {
  const postRepository = getCustomRepository(FtPostRepository)
  await postRepository.delete(id)
}

const service = {
  insert,
  update,
  get,
  getAll,
  deletePost
}

export default service

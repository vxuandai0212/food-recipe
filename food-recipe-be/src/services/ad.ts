import { getCustomRepository } from 'typeorm'
import {
  AdRepository,
  AdViewRepository,
  AdLocationRepository,
  KeywordRepository,
  RecipeKeywordRepository
} from 'repositories/index'
import { AD_PAYED, AD_STATUS } from 'constants/entity'
import { Recipe } from 'entity/recipe'

const insert = async (payload: any) => {
  const adRepository = getCustomRepository(AdRepository)
  let ad: any = await adRepository.create()
  ad = Object.assign({}, payload)
  await adRepository.save(ad)
  return ad
}

const update = async (payload: any) => {
  const { id } = payload
  const adRepository = getCustomRepository(AdRepository)
  const ad = await adRepository.findOneOrFail(id)
  Object.assign(ad, payload)
  await adRepository.save(ad)
  return ad
}

const getAll = async (payload: any) => {
  const { page, limit, searchKeyword, adCustomerId } = payload
  const adRepository = getCustomRepository(AdRepository)
  let getAllBaseQuery = adRepository
    .createQueryBuilder('a')
  if (searchKeyword) {
    getAllBaseQuery = getAllBaseQuery.andWhere('a.name like :searchKeyword or a.link like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  if (adCustomerId) {
    getAllBaseQuery = getAllBaseQuery.andWhere('a.adCustomerId = :adCustomerId', { adCustomerId })
  }
  const items = await getAllBaseQuery
    .skip((page! - 1) * limit!)
    .take(limit)
    .getMany()

  let countBaseQuery = adRepository
    .createQueryBuilder('a')
    .select('count(a.id)', 'total')
  if (searchKeyword) {
    countBaseQuery = countBaseQuery.andWhere('a.name like :searchKeyword or a.link like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  if (adCustomerId) {
    countBaseQuery = countBaseQuery.andWhere('a.adCustomerId = :adCustomerId', { adCustomerId })
  }

  const { total } = await countBaseQuery
    .getRawOne()

  const active = await countActive(payload)
  const inactive = await countInactive(payload)
  const payed = await countPayed(payload)
  const notPayed = await countNotPayed(payload)
  const expire = await countExpire(payload)

  return { total, items, active, inactive, payed, notPayed, expire }
}

const countActive = async (payload: any) => {
  const { searchKeyword, adCustomerId } = payload
  const adRepository = getCustomRepository(AdRepository)
  let countBaseQuery = adRepository
    .createQueryBuilder('a')
    .select('count(a.id)', 'total')
    .where('a.status = :status', { status: AD_STATUS.ACTIVE })
  if (searchKeyword) {
    countBaseQuery = countBaseQuery.andWhere('a.name like :searchKeyword or a.link like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  if (adCustomerId) {
    countBaseQuery = countBaseQuery.andWhere('a.adCustomerId = :adCustomerId', { adCustomerId })
  }

  const { total } = await countBaseQuery
    .getRawOne()

  return total
}

const countInactive = async (payload: any) => {
  const { searchKeyword, adCustomerId } = payload
  const adRepository = getCustomRepository(AdRepository)
  let countBaseQuery = adRepository
    .createQueryBuilder('a')
    .select('count(a.id)', 'total')
    .where('a.status = :status', { status: AD_STATUS.DISABLE })
  if (searchKeyword) {
    countBaseQuery = countBaseQuery.andWhere('a.name like :searchKeyword or a.link like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  if (adCustomerId) {
    countBaseQuery = countBaseQuery.andWhere('a.adCustomerId = :adCustomerId', { adCustomerId })
  }

  const { total } = await countBaseQuery
    .getRawOne()

  return total
}

const countPayed = async (payload: any) => {
  const { searchKeyword, adCustomerId } = payload
  const adRepository = getCustomRepository(AdRepository)
  let countBaseQuery = adRepository
    .createQueryBuilder('a')
    .select('count(a.id)', 'total')
    .where('a.payStatus = :status', { status: AD_PAYED.YES })
  if (searchKeyword) {
    countBaseQuery = countBaseQuery.andWhere('a.name like :searchKeyword or a.link like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  if (adCustomerId) {
    countBaseQuery = countBaseQuery.andWhere('a.adCustomerId = :adCustomerId', { adCustomerId })
  }

  const { total } = await countBaseQuery
    .getRawOne()

  return total
}

const countNotPayed = async (payload: any) => {
  const { searchKeyword, adCustomerId } = payload
  const adRepository = getCustomRepository(AdRepository)
  let countBaseQuery = adRepository
    .createQueryBuilder('a')
    .select('count(a.id)', 'total')
    .where('a.payStatus = :status', { status: AD_PAYED.NO })
  if (searchKeyword) {
    countBaseQuery = countBaseQuery.andWhere('a.name like :searchKeyword or a.link like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  if (adCustomerId) {
    countBaseQuery = countBaseQuery.andWhere('a.adCustomerId = :adCustomerId', { adCustomerId })
  }

  const { total } = await countBaseQuery
    .getRawOne()

  return total
}

const countExpire = async (payload: any) => {
  const { searchKeyword, adCustomerId } = payload
  const adRepository = getCustomRepository(AdRepository)
  let countBaseQuery = adRepository
    .createQueryBuilder('a')
    .select('count(a.id)', 'total')
    .where('a.validToDate < :validToDate', { validToDate: new Date() })
  if (searchKeyword) {
    countBaseQuery = countBaseQuery.andWhere('a.name like :searchKeyword or a.link like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  if (adCustomerId) {
    countBaseQuery = countBaseQuery.andWhere('a.adCustomerId = :adCustomerId', { adCustomerId })
  }

  const { total } = await countBaseQuery
    .getRawOne()

  return total
}

const get = async (id: number) => {
  const adRepository = getCustomRepository(AdRepository)
  const item = await adRepository.findOneOrFail(id)
  return item
}

const deleteAd = async (id: any) => {
  const adRepository = getCustomRepository(AdRepository)
  const ad = await adRepository.findOne(id)
  const adLocationRepository = getCustomRepository(AdLocationRepository)
  const keywordRepository = getCustomRepository(KeywordRepository)
  const recipeKeywordRepository = getCustomRepository(RecipeKeywordRepository)
  await adLocationRepository.delete({ adId: id })
  if (ad) {
    const { name } = ad
    const keyword = await keywordRepository.findOne({ name })
    if (keyword) {
      const keywordId = keyword.id
      await recipeKeywordRepository.delete({ keywordId })
    }
    await keywordRepository.delete({ name })
  }
  await adRepository.delete(id)
}

const adView = async (payload: any) => {
  const { page, limit, adId } = payload
  const adViewRepository = getCustomRepository(AdViewRepository)
  const items = await adViewRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'view')
    .addSelect('c.recipe_id', 'recipeId')
    .addSelect('r.name', 'recipeName')
    .innerJoin(Recipe, 'r', 'r.id = c.recipe_id')
    .where('c.adId = :adId', { adId })
    .groupBy('r.id')
    .orderBy('view', 'DESC')
    .offset((page - 1) * limit)
    .limit(limit)
    .getRawMany()

  const { totalRecipe } = await adViewRepository
    .createQueryBuilder('c')
    .select('count(distinct c.recipe_id)', 'totalRecipe')
    .where('c.adId = :adId', { adId })
    .getRawOne()

  const { totalView } = await adViewRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'totalView')
    .where('c.adId = :adId', { adId })
    .getRawOne()

  return { totalRecipe, items, totalView }
}

const adViewGet = async (payload: any) => {
  const { recipeId, adId } = payload
  const adViewRepository = getCustomRepository(AdViewRepository)
  const item = await adViewRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'view')
    .addSelect('c.recipe_id', 'recipeId')
    .addSelect('r.name', 'recipeName')
    .innerJoin(Recipe, 'r', 'r.id = c.recipe_id')
    .where('c.adId = :adId and c.recipe_id = :recipeId', { adId, recipeId })
    .groupBy('r.id')
    .getRawOne()

  return item
}

const adViewLog = async (payload: any) => {
  const { page, limit, adId, recipeId } = payload
  const adViewRepository = getCustomRepository(AdViewRepository)
  const items = await adViewRepository
    .createQueryBuilder('c')
    .select('c.viewAt', 'viewAt')
    .addSelect('c.ipAddress', 'ipAddress')
    .where('c.adId = :adId', { adId })
    .andWhere('c.recipe_id = :recipeId', { recipeId })
    .orderBy('viewAt', 'DESC')
    .offset((page - 1) * limit)
    .limit(limit)
    .getRawMany()

  const { total } = await adViewRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'total')
    .where('c.adId = :adId', { adId })
    .andWhere('c.recipe_id = :recipeId', { recipeId })
    .getRawOne()

  return { items, total }
}

const adService = {
  insert,
  update,
  get,
  getAll,
  deleteAd,
  adView,
  adViewGet,
  adViewLog
}

export default adService

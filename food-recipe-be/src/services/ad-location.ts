import { getCustomRepository } from 'typeorm'
import {
  AdLocationRepository,
  AdRepository
} from 'repositories/index'
import { Ad } from 'entity/ad'
import { AdCustomer } from 'entity/ad-customer'
import { recipeKeywordService } from 'services/index'

const insert = async (payload: any) => {
  const { recipeId, adId } = payload
  await addRecipeKeyword(recipeId, adId)
  const adLocationRepository = getCustomRepository(AdLocationRepository)
  let item: any = await adLocationRepository.create()
  item = Object.assign({}, payload)
  await adLocationRepository.save(item)
  return item
}

const addRecipeKeyword = async (recipeId: any, adId: any) => {
  const adRepository = getCustomRepository(AdRepository)
  const ad = await adRepository.findOne(adId)
  if (ad) {
    const keyword = ad.name
    await recipeKeywordService.add(recipeId, keyword)
  }
}

const getAll = async (payload: any) => {
  const { recipeId } = payload
  const adLocationRepository = getCustomRepository(AdLocationRepository)
  const items = await adLocationRepository
    .createQueryBuilder('al')
    .innerJoin(Ad, 'a', 'a.id = al.adId')
    .innerJoin(AdCustomer, 'ac', 'ac.id = a.adCustomerId')
    .select('al.id', 'id')
    .addSelect('a.id', 'adId')
    .addSelect('a.name', 'adName')
    .addSelect('a.type', 'adType')
    .addSelect('a.link', 'adLink')
    .addSelect('ac.name', 'customerName')
    .where('al.recipeId = :recipeId', { recipeId })
    .orderBy('customerName', 'ASC')
    .getRawMany()
  return items
}

const deleteAdLocation = async (id: any) => {
  const adLocationRepository = getCustomRepository(AdLocationRepository)
  await removeRecipeKeyword(id)
  await adLocationRepository.delete(id)
}

const removeRecipeKeyword = async (id: any) => {
  const adLocationRepository = getCustomRepository(AdLocationRepository)
  const adLocation = await adLocationRepository.findOne(id)
  if (adLocation) {
    const { adId, recipeId } = adLocation
    const adRepository = getCustomRepository(AdRepository)
    const ad = await adRepository.findOne(adId)
    if (ad) {
      const { name } = ad
      await recipeKeywordService.removeRecipeKeyword(recipeId, name)
    }
  }
}

const adLocationService = {
  insert,
  getAll,
  deleteAdLocation
}

export default adLocationService

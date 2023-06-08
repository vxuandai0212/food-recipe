import { getCustomRepository } from 'typeorm'
import {
  AdViewRepository
} from 'repositories/index'
import { Recipe } from 'entity/recipe'
import { AdCustomer } from 'entity/ad-customer'
import { Ad } from 'entity/ad'
import { toTimeDB } from 'utils/common'

const nativeAd = async (payload: any) => {
  const { page, limit, fromDate, toDate } = payload
  const adViewRepository = getCustomRepository(AdViewRepository)
  const items = await adViewRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'view')
    .addSelect('c.recipe_id', 'recipeId')
    .addSelect('r.name', 'recipeName')
    .addSelect('a.link', 'link')
    .addSelect('ac.name', 'customerName')
    .addSelect('a.name', 'adName')
    .addSelect('a.type', 'adType')
    .innerJoin(Recipe, 'r', 'c.recipe_id = r.id')
    .innerJoin(Ad, 'a', 'a.id = c.adId')
    .innerJoin(AdCustomer, 'ac', 'ac.id = a.adCustomerId')
    .where('c.viewAt between :fromDate and :toDate', { fromDate: toTimeDB(fromDate), toDate: toTimeDB(toDate) })
    .andWhere('c.adId not in (:adIds)', { adIds: [1, 2, 3] })
    .groupBy('a.id')
    .orderBy('view', 'DESC')
    .offset((page - 1) * limit)
    .limit(limit)
    .getRawMany()

  const { totalAd } = await adViewRepository
    .createQueryBuilder('c')
    .select('count(distinct c.adId)', 'totalAd')
    .where('c.viewAt between :fromDate and :toDate', { fromDate: toTimeDB(fromDate), toDate: toTimeDB(toDate) })
    .andWhere('c.adId not in (:adIds)', { adIds: [1, 2, 3] })
    .getRawOne()

  const { totalView } = await adViewRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'totalView')
    .where('c.viewAt between :fromDate and :toDate', { fromDate: toTimeDB(fromDate), toDate: toTimeDB(toDate) })
    .andWhere('c.adId not in (:adIds)', { adIds: [1, 2, 3] })
    .getRawOne()

  return { totalAd, items, totalView }
}

const admob = async (payload: any) => {
  const { page, limit, fromDate, toDate } = payload
  const adViewRepository = getCustomRepository(AdViewRepository)
  const items = await adViewRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'view')
    .addSelect('c.recipe_id', 'recipeId')
    .addSelect('r.name', 'recipeName')
    .addSelect('a.link', 'link')
    .addSelect('ac.name', 'customerName')
    .addSelect('a.name', 'adName')
    .addSelect('a.type', 'adType')
    .innerJoin(Recipe, 'r', 'c.recipe_id = r.id')
    .innerJoin(Ad, 'a', 'a.id = c.adId')
    .innerJoin(AdCustomer, 'ac', 'ac.id = a.adCustomerId')
    .where('c.viewAt between :fromDate and :toDate', { fromDate: toTimeDB(fromDate), toDate: toTimeDB(toDate) })
    .andWhere('c.adId in (:adIds)', { adIds: [1, 2, 3] })
    .groupBy('a.id')
    .orderBy('view', 'DESC')
    .offset((page - 1) * limit)
    .limit(limit)
    .getRawMany()

  const { totalAd } = await adViewRepository
    .createQueryBuilder('c')
    .select('count(distinct c.adId)', 'totalAd')
    .where('c.viewAt between :fromDate and :toDate', { fromDate: toTimeDB(fromDate), toDate: toTimeDB(toDate) })
    .andWhere('c.adId in (:adIds)', { adIds: [1, 2, 3] })
    .getRawOne()

  const { totalView } = await adViewRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'totalView')
    .where('c.viewAt between :fromDate and :toDate', { fromDate: toTimeDB(fromDate), toDate: toTimeDB(toDate) })
    .andWhere('c.adId in (:adIds)', { adIds: [1, 2, 3] })
    .getRawOne()

  return { totalAd, items, totalView }
}

const adViewService = {
  nativeAd,
  admob
}

export default adViewService

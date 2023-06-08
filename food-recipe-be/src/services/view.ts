import { getCustomRepository } from 'typeorm'
import {
  ViewRepository
} from 'repositories/index'
import { VIEW_TYPE } from 'constants/entity'
import { Recipe } from 'entity/recipe'
import { toTimeDB } from 'utils/common'
import { Keyword } from 'entity/keyword'

const recipe = async (payload: any) => {
  const { page, limit, fromDate, toDate } = payload
  const viewRepository = getCustomRepository(ViewRepository)
  const items = await viewRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'view')
    .addSelect('c.objectId', 'id')
    .addSelect('r.name', 'name')
    .innerJoin(Recipe, 'r', 'r.id = c.objectId and c.type = :type', { type: VIEW_TYPE.RECIPE })
    .where('c.viewAt between :fromDate and :toDate', { fromDate: toTimeDB(fromDate), toDate: toTimeDB(toDate) })
    .groupBy('r.id')
    .orderBy('view', 'DESC')
    .offset((page - 1) * limit)
    .limit(limit)
    .getRawMany()

  const { totalView } = await viewRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'totalView')
    .where('c.viewAt between :fromDate and :toDate', { fromDate: toTimeDB(fromDate), toDate: toTimeDB(toDate) })
    .andWhere('c.type = :type', { type: VIEW_TYPE.RECIPE })
    .getRawOne()

  const { totalRecipe } = await viewRepository
    .createQueryBuilder('c')
    .select('count(distinct c.objectId)', 'totalRecipe')
    .where('c.viewAt between :fromDate and :toDate', { fromDate: toTimeDB(fromDate), toDate: toTimeDB(toDate) })
    .andWhere('c.type = :type', { type: VIEW_TYPE.RECIPE })
    .getRawOne()

  return { totalView, items, totalRecipe }
}

const keyword = async (payload: any) => {
  const { page, limit, fromDate, toDate } = payload
  const viewRepository = getCustomRepository(ViewRepository)
  const items = await viewRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'view')
    .addSelect('c.objectId', 'id')
    .addSelect('r.name', 'name')
    .innerJoin(Keyword, 'r', 'r.id = c.objectId and c.type = :type', { type: VIEW_TYPE.KEYWORD })
    .where('c.viewAt between :fromDate and :toDate', { fromDate: toTimeDB(fromDate), toDate: toTimeDB(toDate) })
    .groupBy('r.id')
    .orderBy('view', 'DESC')
    .offset((page - 1) * limit)
    .limit(limit)
    .getRawMany()

  const { totalView } = await viewRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'totalView')
    .where('c.viewAt between :fromDate and :toDate', { fromDate: toTimeDB(fromDate), toDate: toTimeDB(toDate) })
    .andWhere('c.type = :type', { type: VIEW_TYPE.KEYWORD })
    .getRawOne()

  const { totalKeyword } = await viewRepository
    .createQueryBuilder('c')
    .select('count(distinct c.objectId)', 'totalKeyword')
    .where('c.viewAt between :fromDate and :toDate', { fromDate: toTimeDB(fromDate), toDate: toTimeDB(toDate) })
    .andWhere('c.type = :type', { type: VIEW_TYPE.KEYWORD })
    .getRawOne()

  return { totalKeyword, items, totalView }
}

const viewService = {
  recipe,
  keyword
}

export default viewService

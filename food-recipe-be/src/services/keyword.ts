import { getCustomRepository } from 'typeorm'
import {
  KeywordRepository
} from 'repositories/index'

const insert = async (payload: any) => {
  const keywordRepository = getCustomRepository(KeywordRepository)
  let item: any = await keywordRepository.create()
  item = Object.assign({}, payload)
  await keywordRepository.save(item)
  return item
}

const getAll = async (payload: any) => {
  const { page, limit, searchKeyword } = payload
  const keywordRepository = getCustomRepository(KeywordRepository)
  let getAllBaseQuery = keywordRepository
    .createQueryBuilder('k')
  if (searchKeyword) {
    getAllBaseQuery = getAllBaseQuery.andWhere('k.name like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  const items = await getAllBaseQuery
    .offset((page! - 1) * limit!)
    .limit(limit)
    .getMany()

  let countBaseQuery = keywordRepository
    .createQueryBuilder('k')
    .select('count(k.id)', 'total')
  if (searchKeyword) {
    countBaseQuery = countBaseQuery.andWhere('k.name like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }

  const { total } = await countBaseQuery
    .getRawOne()

  return { total, items }
}

const keywordService = {
  insert,
  getAll
}

export default keywordService

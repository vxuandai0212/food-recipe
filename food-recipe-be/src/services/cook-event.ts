import { getCustomRepository } from 'typeorm'
import {
  CookEventRepository
} from 'repositories/index'
import { ApiError } from 'utils/ApiError'
import httpStatus from 'http-status'
import { COOK_EVENT_NAME_TAKEN } from 'constants/message'

const insert = async (payload: any) => {
  const cookEventRepository = getCustomRepository(CookEventRepository)
  const { name } = payload
  if (name && await cookEventRepository.isCookEventNameTaken(name, null)) {
    throw new ApiError(httpStatus.BAD_REQUEST, COOK_EVENT_NAME_TAKEN)
  }
  let cookEvent: any = await cookEventRepository.create()
  cookEvent = Object.assign({}, payload)
  await cookEventRepository.save(cookEvent)
  return cookEvent
}

const update = async (payload: any) => {
  const { id, name } = payload
  const cookEventRepository = getCustomRepository(CookEventRepository)
  const cookEvent = await cookEventRepository.findOneOrFail(id)
  if (name && await cookEventRepository.isCookEventNameTaken(name, id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, COOK_EVENT_NAME_TAKEN)
  }
  Object.assign(cookEvent, payload)
  await cookEventRepository.save(cookEvent)
  return cookEvent
}

const getAll = async (payload: any) => {
  const { page, limit, searchKeyword } = payload
  const cookEventRepository = getCustomRepository(CookEventRepository)
  let getAllBaseQuery = cookEventRepository
    .createQueryBuilder('c')
  if (searchKeyword) {
    getAllBaseQuery = getAllBaseQuery.andWhere('c.name like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  const items = await getAllBaseQuery
    .orderBy('c.name', 'ASC')
    .skip((page - 1) * limit)
    .take(limit)
    .getMany()

  let countBaseQuery = cookEventRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'total')
  if (searchKeyword) {
    countBaseQuery = countBaseQuery.andWhere('c.name like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }

  const { total } = await countBaseQuery
    .getRawOne()

  return { total, items }
}

const get = async (id: number) => {
  const cookEventRepository = getCustomRepository(CookEventRepository)
  const cookEvent = await cookEventRepository.findOneOrFail(id)
  return cookEvent
}

const deleteCookEvent = async (ids: Array<number>) => {
  const cookEventRepository = getCustomRepository(CookEventRepository)
  await cookEventRepository.delete(ids)
}

const cookEventService = {
  insert,
  update,
  getAll,
  get,
  deleteCookEvent
}

export default cookEventService

import { getCustomRepository } from 'typeorm'
import {
  AdCustomerRepository
} from 'repositories/index'
import { ApiError } from 'utils/ApiError'
import httpStatus from 'http-status'
import { AD_CUSTOMER_PHONE_EXIST } from 'constants/message'

const insert = async (payload: any) => {
  const adCustomerRepository = getCustomRepository(AdCustomerRepository)
  const { phone } = payload
  if (await adCustomerRepository.isAdCustomerPhoneExist(phone, null)) {
    throw new ApiError(httpStatus.BAD_REQUEST, AD_CUSTOMER_PHONE_EXIST)
  }
  let item: any = await adCustomerRepository.create()
  item = Object.assign({}, payload)
  await adCustomerRepository.save(item)
  return item
}

const update = async (payload: any) => {
  const { id, phone } = payload
  const adCustomerRepository = getCustomRepository(AdCustomerRepository)
  const item = await adCustomerRepository.findOneOrFail(id)
  if (await adCustomerRepository.isAdCustomerPhoneExist(phone, id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, AD_CUSTOMER_PHONE_EXIST)
  }
  Object.assign(item, payload)
  await adCustomerRepository.save(item)
  return item
}

const getAll = async (payload: any) => {
  const { page, limit, searchKeyword } = payload
  const adCustomerRepository = getCustomRepository(AdCustomerRepository)
  let getAllBaseQuery = adCustomerRepository
    .createQueryBuilder('c')
  if (searchKeyword) {
    getAllBaseQuery = getAllBaseQuery.andWhere('c.name like :searchKeyword or c.phone like :searchKeyword or c.email like :searchKeyword or c.website like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  const items = await getAllBaseQuery
    .orderBy('c.name', 'ASC')
    .skip((page - 1) * limit)
    .take(limit)
    .getMany()

  let countBaseQuery = adCustomerRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'total')
  if (searchKeyword) {
    countBaseQuery = countBaseQuery.andWhere('c.name like :searchKeyword or c.phone like :searchKeyword or c.email like :searchKeyword or c.website like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }

  const { total } = await countBaseQuery
    .getRawOne()

  return { total, items }
}

const get = async (id: number) => {
  const adCustomerRepository = getCustomRepository(AdCustomerRepository)
  const item = await adCustomerRepository.findOneOrFail(id)
  return item
}

const deleteAdCustomer = async (id: any) => {
  const adCustomerRepository = getCustomRepository(AdCustomerRepository)
  await adCustomerRepository.delete(id)
}

const adCustomerService = {
  insert,
  update,
  getAll,
  get,
  deleteAdCustomer
}

export default adCustomerService

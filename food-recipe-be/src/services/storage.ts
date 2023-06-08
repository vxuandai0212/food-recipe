import { getCustomRepository } from 'typeorm'
import {
  StorageRepository
} from 'repositories/index'
import { ApiError } from 'utils/ApiError'
import httpStatus from 'http-status'
import { STORAGE_CLOUD_NAME_TAKEN } from 'constants/message'
import { STORAGE_IS_DEFAULT } from 'constants/params'

const insert = async (payload: any) => {
  const storageRepository = getCustomRepository(StorageRepository)
  const { cloudName, isDefault } = payload
  if (cloudName && await storageRepository.isStorageCloudNameTaken(cloudName, null)) {
    throw new ApiError(httpStatus.BAD_REQUEST, STORAGE_CLOUD_NAME_TAKEN)
  }
  if (isDefault === STORAGE_IS_DEFAULT.ENABLE) {
    await unsetDefaultStorage(null)
  }
  let storage: any = await storageRepository.create()
  storage = Object.assign({}, payload)
  await storageRepository.save(storage)
  return storage
}

const unsetDefaultStorage = async (excludeId: any) => {
  const storageRepository = getCustomRepository(StorageRepository)
  let query = storageRepository.createQueryBuilder()
    .update()
    .set({ isDefault: STORAGE_IS_DEFAULT.DISABLE })
  if (excludeId) {
    query = query.where('id != :excludeId', { excludeId })
  }

  await query.execute()
}

const update = async (payload: any) => {
  const { id, cloudName, isDefault } = payload
  const storageRepository = getCustomRepository(StorageRepository)
  const storage = await storageRepository.findOneOrFail(id)
  if (cloudName && await storageRepository.isStorageCloudNameTaken(cloudName, id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, STORAGE_CLOUD_NAME_TAKEN)
  }
  if (isDefault === STORAGE_IS_DEFAULT.ENABLE) {
    await unsetDefaultStorage(id)
  }
  Object.assign(storage, payload)
  await storageRepository.save(storage)
  return storage
}

const getAll = async (payload: any) => {
  const { page, limit, searchKeyword } = payload
  const storageRepository = getCustomRepository(StorageRepository)
  let getAllBaseQuery = storageRepository
    .createQueryBuilder('c')
  if (searchKeyword) {
    getAllBaseQuery = getAllBaseQuery.andWhere('c.cloudName like :searchKeyword or c.apiKey like :searchKeyword or c.apiSecret like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  const items = await getAllBaseQuery
    .orderBy('c.cloudName', 'ASC')
    .skip((page - 1) * limit)
    .take(limit)
    .getMany()

  let countBaseQuery = storageRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'total')
  if (searchKeyword) {
    countBaseQuery = countBaseQuery.andWhere('c.cloudName like :searchKeyword or c.apiKey like :searchKeyword or c.apiSecret like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }

  const { total } = await countBaseQuery
    .getRawOne()

  return { total, items }
}

const getDefault = async () => {
  const storageRepository = getCustomRepository(StorageRepository)
  const storage = await storageRepository.findOneOrFail({ isDefault: STORAGE_IS_DEFAULT.ENABLE })
  return storage
}

const deleteStorage = async (ids: Array<number>) => {
  const storageRepository = getCustomRepository(StorageRepository)
  await storageRepository.delete(ids)
}

const storageService = {
  insert,
  update,
  getAll,
  getDefault,
  deleteStorage
}

export default storageService

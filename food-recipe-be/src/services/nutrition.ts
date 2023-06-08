import { getCustomRepository } from 'typeorm'
import {
  NutritionRepository
} from 'repositories/index'
import { ApiError } from 'utils/ApiError'
import httpStatus from 'http-status'
import { NUTRITION_NAME_TAKEN } from 'constants/message'
import { IngredientNutrition } from 'entity/ingredient-nutrition'

const insert = async (payload: any) => {
  const nutritionRepository = getCustomRepository(NutritionRepository)
  const { name } = payload
  if (name && await nutritionRepository.isNutritionNameTaken(name, null)) {
    throw new ApiError(httpStatus.BAD_REQUEST, NUTRITION_NAME_TAKEN)
  }
  let nutrition: any = await nutritionRepository.create()
  nutrition = Object.assign({}, payload)
  await nutritionRepository.save(nutrition)
  return nutrition
}

const update = async (payload: any) => {
  const { id, name } = payload
  const nutritionRepository = getCustomRepository(NutritionRepository)
  const nutrition = await nutritionRepository.findOneOrFail(id)
  if (name && await nutritionRepository.isNutritionNameTaken(name, id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, NUTRITION_NAME_TAKEN)
  }
  Object.assign(nutrition, payload)
  await nutritionRepository.save(nutrition)
  return nutrition
}

const getAll = async (payload: any) => {
  const { page, limit, searchKeyword } = payload
  const nutritionRepository = getCustomRepository(NutritionRepository)
  let getAllBaseQuery = nutritionRepository
    .createQueryBuilder('c')
  if (searchKeyword) {
    getAllBaseQuery = getAllBaseQuery.andWhere('c.name like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  const items = await getAllBaseQuery
    .orderBy('c.name', 'ASC')
    .skip((page - 1) * limit)
    .take(limit)
    .getMany()

  let countBaseQuery = nutritionRepository
    .createQueryBuilder('c')
    .select('count(c.id)', 'total')
  if (searchKeyword) {
    countBaseQuery = countBaseQuery.andWhere('c.name like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }

  const { total } = await countBaseQuery
    .getRawOne()

  return { total, items }
}

const getIngredientNutrition = async (id: any) => {
  const nutritionRepository = getCustomRepository(NutritionRepository)
  const items = await nutritionRepository
    .createQueryBuilder('n')
    .innerJoin(IngredientNutrition, 'in', 'n.id = in.nutritionId')
    .select('n.id', 'id')
    .addSelect('n.name', 'name')
    .addSelect('n.unitId', 'unitId')
    .addSelect('in.nutritionValue', 'value')
    .andWhere('n.id = :id', { id })
    .orderBy('n.name', 'ASC')
    .getRawMany()

  return items
}

const deleteNutrition = async (ids: Array<number>) => {
  const nutritionRepository = getCustomRepository(NutritionRepository)
  await nutritionRepository.delete(ids)
}

const nutritionService = {
  insert,
  update,
  getAll,
  getIngredientNutrition,
  deleteNutrition
}

export default nutritionService

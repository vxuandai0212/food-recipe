import { getCustomRepository } from 'typeorm'
import {
  IngredientRepository
} from 'repositories/index'
import { ApiError } from 'utils/ApiError'
import httpStatus from 'http-status'
import { INGREDIENT_NAME_TAKEN } from 'constants/message'
import { imageService } from 'services/index'

const insert = async (payload: any) => {
  const ingredientRepository = getCustomRepository(IngredientRepository)
  const { name } = payload
  if (name && await ingredientRepository.isIngredientNameTaken(name, null)) {
    throw new ApiError(httpStatus.BAD_REQUEST, INGREDIENT_NAME_TAKEN)
  }
  let ingredient: any = await ingredientRepository.create()
  ingredient = Object.assign({}, payload)
  await ingredientRepository.save(ingredient)
  return ingredient
}

const update = async (payload: any) => {
  const { id, name } = payload
  const ingredientRepository = getCustomRepository(IngredientRepository)
  const ingredient = await ingredientRepository.findOneOrFail(id)
  if (name && await ingredientRepository.isIngredientNameTaken(name, id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, INGREDIENT_NAME_TAKEN)
  }
  Object.assign(ingredient, payload)
  await ingredientRepository.save(ingredient)
  return ingredient
}

const getAll = async (payload: any) => {
  const { page, limit, searchKeyword } = payload
  const ingredientRepository = getCustomRepository(IngredientRepository)
  let getAllBaseQuery = ingredientRepository
    .createQueryBuilder('c')
  if (searchKeyword) {
    getAllBaseQuery = getAllBaseQuery.andWhere('c.name like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  const items = await getAllBaseQuery
    .orderBy('c.id', 'DESC')
    .skip((page - 1) * limit)
    .take(limit)
    .getMany()

  let countBaseQuery = ingredientRepository
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
  const ingredientRepository = getCustomRepository(IngredientRepository)
  const ingredient: any = await ingredientRepository.findOneOrFail(id)
  const image = await imageService.getIngredientImage(id)
  ingredient.image = image
  return ingredient
}

const deleteIngredient = async (id: any) => {
  const ingredientRepository = getCustomRepository(IngredientRepository)
  await ingredientRepository.delete(id)
}

const ingredientService = {
  insert,
  update,
  get,
  getAll,
  deleteIngredient
}

export default ingredientService

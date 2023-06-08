import { getCustomRepository } from 'typeorm'
import {
  RecipeRepository
} from 'repositories/index'
import { ApiError } from 'utils/ApiError'
import httpStatus from 'http-status'
import { RECIPE_NAME_TAKEN } from 'constants/message'
import { RecipeKeyword } from 'entity/recipe-keyword'
import { Keyword } from 'entity/keyword'
import recipeKeywordService from 'services/recipe-keyword'

const insert = async (payload: any) => {
  const recipeRepository = getCustomRepository(RecipeRepository)
  const { name } = payload
  if (name && await recipeRepository.isRecipeNameTaken(name, null)) {
    throw new ApiError(httpStatus.BAD_REQUEST, RECIPE_NAME_TAKEN)
  }
  let recipe = await recipeRepository.create()
  recipe = Object.assign({}, payload)
  recipe.createdAt = new Date()
  await recipeRepository.save(recipe)

  const { id } = recipe

  await recipeKeywordService.add(id, name)

  return recipe
}

const update = async (payload: any) => {
  const { id, name } = payload
  const recipeRepository = getCustomRepository(RecipeRepository)
  let recipe = await recipeRepository.findOneOrFail(id)
  const oldName = recipe.name
  if (oldName !== name) {
    await recipeKeywordService.add(id, name)
  }
  if (name && await recipeRepository.isRecipeNameTaken(name, id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, RECIPE_NAME_TAKEN)
  }
  recipe = Object.assign({}, payload)
  await recipeRepository.save(recipe)
  return recipe
}

const getAll = async (payload: any) => {
  const { page, limit, searchKeyword } = payload
  const recipeRepository = getCustomRepository(RecipeRepository)
  let getAllBaseQuery = recipeRepository
    .createQueryBuilder('c')
    .innerJoin(RecipeKeyword, 'rk', 'rk.recipeId = c.id')
    .innerJoin(Keyword, 'k', 'k.id = rk.keywordId')
    .select('c.id', 'id')
    .addSelect('c.name', 'name')
    .addSelect('c.cookTime', 'cookTime')
  if (searchKeyword) {
    getAllBaseQuery = getAllBaseQuery.where('k.name = :searchKeyword', { searchKeyword })
  }
  const items = await getAllBaseQuery
    .offset((page - 1) * limit)
    .limit(limit)
    .orderBy('c.id', 'DESC')
    .distinct(true)
    .getRawMany()

  let countBaseQuery = recipeRepository
    .createQueryBuilder('c')
    .innerJoin(RecipeKeyword, 'rk', 'rk.recipeId = c.id')
    .innerJoin(Keyword, 'k', 'k.id = rk.keywordId')
    .select('count(distinct c.id)', 'total')
  if (searchKeyword) {
    countBaseQuery = countBaseQuery.where('k.name = :searchKeyword', { searchKeyword })
  }

  const { total } = await countBaseQuery
    .getRawOne()

  return { total, items }
}

const get = async (id: number) => {
  const recipeRepository = getCustomRepository(RecipeRepository)
  const recipe = await recipeRepository.findOneOrFail(id)
  return recipe
}

const deleteRecipe = async (id: any) => {
  const recipeRepository = getCustomRepository(RecipeRepository)
  await recipeRepository.delete(id)
}

const recipeService = {
  insert,
  update,
  getAll,
  get,
  deleteRecipe
}

export default recipeService

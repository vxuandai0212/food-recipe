import { getCustomRepository } from 'typeorm'
import {
  RecipeIngredientRepository,
  IngredientRepository
} from 'repositories/index'
import { ApiError } from 'utils/ApiError'
import httpStatus from 'http-status'
import { RECIPE_INGREDIENT_EXIST } from 'constants/message'
import { Ingredient } from 'entity/ingredient'
import { recipeKeywordService } from 'services/index'

const insert = async (payload: any) => {
  const recipeIngredientRepository = getCustomRepository(RecipeIngredientRepository)
  const { recipeId, ingredientId } = payload
  if (recipeId && ingredientId && await recipeIngredientRepository.isRecipeIngredientExist(recipeId, ingredientId, null)) {
    throw new ApiError(httpStatus.BAD_REQUEST, RECIPE_INGREDIENT_EXIST)
  }
  await addRecipeKeyword(recipeId, ingredientId)
  let recipeIngredient: any = await recipeIngredientRepository.create()
  recipeIngredient = Object.assign({}, payload)
  await recipeIngredientRepository.save(recipeIngredient)
  return recipeIngredient
}

const update = async (payload: any) => {
  const recipeIngredientRepository = getCustomRepository(RecipeIngredientRepository)
  const { id, recipeId, ingredientId } = payload
  if (recipeId && ingredientId && await recipeIngredientRepository.isRecipeIngredientExist(recipeId, ingredientId, id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, RECIPE_INGREDIENT_EXIST)
  }
  const recipeIngredient = await recipeIngredientRepository.findOneOrFail(id)
  if (recipeIngredient) {
    const oldIngredientId = recipeIngredient.ingredientId
    if (ingredientId !== oldIngredientId) {
      await addRecipeKeyword(recipeId, ingredientId)
      await removeRecipeKeywordByIngredientIdAndRecipeId(oldIngredientId, recipeId)
    }
    Object.assign(recipeIngredient, payload)
    await recipeIngredientRepository.save(recipeIngredient)
    return recipeIngredient
  }
}

const addRecipeKeyword = async (recipeId: any, ingredientId: any) => {
  const ingredientRepository = getCustomRepository(IngredientRepository)
  const ingredient = await ingredientRepository.findOne(ingredientId)
  if (ingredient) {
    const keyword = ingredient.name
    await recipeKeywordService.add(recipeId, keyword)
  }
}

const getAll = async (payload: any) => {
  const { recipeId } = payload
  const recipeIngredientRepository = getCustomRepository(RecipeIngredientRepository)
  const items = await recipeIngredientRepository
    .createQueryBuilder('ri')
    .innerJoin(Ingredient, 'i', 'i.id = ri.ingredientId')
    .select('ri.id', 'id')
    .addSelect('ri.ingredientId', 'ingredientId')
    .addSelect('ri.recipeId', 'recipeId')
    .addSelect('i.name', 'ingredientName')
    .addSelect('ri.quantity', 'quantity')
    .addSelect('ri.displayQuantity', 'displayQuantity')
    .addSelect('ri.displayQuantityUnit', 'displayQuantityUnit')
    .where('ri.recipeId = :recipeId', { recipeId })
    .orderBy('ri.id', 'DESC')
    .getRawMany()

  return items
}

const deleteRecipeIngredient = async (id: any) => {
  const recipeIngredientRepository = getCustomRepository(RecipeIngredientRepository)
  await removeRecipeKeyword(id)
  await recipeIngredientRepository.delete(id)
}

const removeRecipeKeyword = async (id: any) => {
  const recipeIngredientRepository = getCustomRepository(RecipeIngredientRepository)
  const recipeIngredient = await recipeIngredientRepository.findOne(id)
  if (recipeIngredient) {
    const { ingredientId, recipeId } = recipeIngredient
    await removeRecipeKeywordByIngredientIdAndRecipeId(ingredientId, recipeId)
  }
}

const removeRecipeKeywordByIngredientIdAndRecipeId = async (ingredientId: any, recipeId: any) => {
  const ingredientRepository = getCustomRepository(IngredientRepository)
  const ingredient = await ingredientRepository.findOne(ingredientId)
  if (ingredient) {
    const { name } = ingredient
    await recipeKeywordService.removeRecipeKeyword(recipeId, name)
  }
}

const recipeIngredientService = {
  insert,
  update,
  getAll,
  deleteRecipeIngredient
}

export default recipeIngredientService

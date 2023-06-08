import { getCustomRepository } from 'typeorm'
import {
  IngredientNutritionRepository
} from 'repositories/index'
import { ApiError } from 'utils/ApiError'
import httpStatus from 'http-status'
import { INGREDIENT_NUTRITION_EXIST } from 'constants/message'
import { Ingredient } from 'entity/ingredient'
import { Nutrition } from 'entity/nutrition'

const insert = async (payload: any) => {
  const ingredientNutritionRepository = getCustomRepository(IngredientNutritionRepository)
  const { ingredientId, nutritionId } = payload
  if (ingredientId && nutritionId && await ingredientNutritionRepository.isIngredientNutritionExist(ingredientId, nutritionId, null)) {
    throw new ApiError(httpStatus.BAD_REQUEST, INGREDIENT_NUTRITION_EXIST)
  }
  let ingredientNutrition: any = await ingredientNutritionRepository.create()
  ingredientNutrition = Object.assign({}, payload)
  await ingredientNutritionRepository.save(ingredientNutrition)
  return ingredientNutrition
}

const update = async (payload: any) => {
  const { id, ingredientId, nutritionId } = payload
  const ingredientNutritionRepository = getCustomRepository(IngredientNutritionRepository)
  if (ingredientId && nutritionId && await ingredientNutritionRepository.isIngredientNutritionExist(ingredientId, nutritionId, id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, INGREDIENT_NUTRITION_EXIST)
  }
  const ingredientNutrition = await ingredientNutritionRepository.findOneOrFail(id)
  Object.assign(ingredientNutrition, payload)
  await ingredientNutritionRepository.save(ingredientNutrition)
  return ingredientNutrition
}

const getAll = async (payload: any) => {
  const { ingredientId } = payload
  const ingredientNutritionRepository = getCustomRepository(IngredientNutritionRepository)
  return await ingredientNutritionRepository
    .createQueryBuilder('in')
    .innerJoin(Ingredient, 'i', 'i.id = in.ingredientId')
    .innerJoin(Nutrition, 'n', 'n.id = in.nutritionId')
    .select('in.id', 'id')
    .addSelect('n.name', 'nutritionName')
    .addSelect('n.id', 'nutritionId')
    .addSelect('in.nutritionValue', 'nutritionValue')
    .where('i.id = :ingredientId', { ingredientId })
    .orderBy('in.id', 'DESC')
    .getRawMany()
}

const deleteIngredientNutrition = async (id: any) => {
  const ingredientNutritionRepository = getCustomRepository(IngredientNutritionRepository)
  await ingredientNutritionRepository.delete(id)
}

const ingredientNutritionService = {
  getAll,
  insert,
  update,
  deleteIngredientNutrition
}

export default ingredientNutritionService

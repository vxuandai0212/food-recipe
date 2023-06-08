import { getCustomRepository } from 'typeorm'
import {
  RecipeCookEventRepository,
  CookEventRepository
} from 'repositories/index'
import { ApiError } from 'utils/ApiError'
import httpStatus from 'http-status'
import { RECIPE_COOK_EVENT_EXIST } from 'constants/message'
import { Recipe } from 'entity/recipe'
import { CookEvent } from 'entity/cook-event'
import { recipeKeywordService } from 'services/index'

const add = async (payload: any) => {
  const { recipeId, cookEventName } = payload
  const recipeCookEventRepository = getCustomRepository(RecipeCookEventRepository)
  const cookEventRepository = getCustomRepository(CookEventRepository)
  const cookEvent = await cookEventRepository.findOne({ name: cookEventName })
  if (cookEvent) {
    const cookEventId = cookEvent.id
    if (recipeId && cookEventId && await recipeCookEventRepository.isRecipeCookEventExist(recipeId, cookEventId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, RECIPE_COOK_EVENT_EXIST)
    }
    await addRecipeKeyword(recipeId, cookEventId)
    const recipeCookEvent = await recipeCookEventRepository.create()
    recipeCookEvent.cookEventId = cookEventId
    recipeCookEvent.recipeId = recipeId
    await recipeCookEventRepository.save(recipeCookEvent)
    return recipeCookEvent
  } else {
    const newCookEvent = await cookEventRepository.create()
    newCookEvent.name = cookEventName
    await cookEventRepository.save(newCookEvent)
    const cookEventId = newCookEvent.id
    if (recipeId && cookEventId && await recipeCookEventRepository.isRecipeCookEventExist(recipeId, cookEventId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, RECIPE_COOK_EVENT_EXIST)
    }
    await addRecipeKeyword(recipeId, cookEventId)
    const recipeCookEvent = await recipeCookEventRepository.create()
    recipeCookEvent.cookEventId = cookEventId
    recipeCookEvent.recipeId = recipeId
    await recipeCookEventRepository.save(recipeCookEvent)
    return recipeCookEvent
  }
}

const addRecipeKeyword = async (recipeId: any, cookEventId: any) => {
  const cookEventRepository = getCustomRepository(CookEventRepository)
  const cookEvent = await cookEventRepository.findOne(cookEventId)
  if (cookEvent) {
    const keyword = cookEvent.name
    await recipeKeywordService.add(recipeId, keyword)
  }
}

const getAll = async (payload: any) => {
  const { searchKeyword, recipeId } = payload
  const recipeCookEventRepository = getCustomRepository(RecipeCookEventRepository)
  let getAllBaseQuery = recipeCookEventRepository
    .createQueryBuilder('rce')
    .innerJoin(Recipe, 'r', 'r.id = rce.recipeId')
    .innerJoin(CookEvent, 'ce', 'ce.id = rce.cookEventId')
    .select('rce.id', 'id')
    .addSelect('ce.name', 'name')
    .where('rce.recipeId = :recipeId', { recipeId })
  if (searchKeyword) {
    getAllBaseQuery = getAllBaseQuery.andWhere('ce.name like :searchKeyword', { searchKeyword: `%${searchKeyword}%` })
  }
  const items = await getAllBaseQuery
    .orderBy('ce.name', 'ASC')
    .getRawMany()

  return items
}

const deleteRecipeCookEvent = async (id: any) => {
  const recipeCookEventRepository = getCustomRepository(RecipeCookEventRepository)
  await removeRecipeKeyword(id)
  await recipeCookEventRepository.delete(id)
}

const removeRecipeKeyword = async (id: any) => {
  const recipeCookEventRepository = getCustomRepository(RecipeCookEventRepository)
  const recipeCookEvent = await recipeCookEventRepository.findOne(id)
  if (recipeCookEvent) {
    const { cookEventId, recipeId } = recipeCookEvent
    const cookEventRepository = getCustomRepository(CookEventRepository)
    const cookEvent = await cookEventRepository.findOne(cookEventId)
    if (cookEvent) {
      const { name } = cookEvent
      await recipeKeywordService.removeRecipeKeyword(recipeId, name)
    }
  }
}

const recipeCookEventService = {
  add,
  getAll,
  deleteRecipeCookEvent
}

export default recipeCookEventService

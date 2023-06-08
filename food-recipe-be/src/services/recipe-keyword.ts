import { getCustomRepository } from 'typeorm'
import {
  RecipeKeywordRepository,
  KeywordRepository
} from 'repositories/index'
import { Keyword } from 'entity/keyword'
import { ApiError } from 'utils/ApiError'
import httpStatus from 'http-status'
import { RECIPE_KEYWORD_EXIST } from 'constants/message'

const insert = async (payload: any) => {
  const recipeKeywordRepository = getCustomRepository(RecipeKeywordRepository)
  const keywordRepository = getCustomRepository(KeywordRepository)
  const { keywordName, recipeId } = payload
  const keyword = await keywordRepository.findOne({ name: keywordName })
  if (keyword) {
    const keywordId = keyword.id
    if (keywordId && recipeId && await recipeKeywordRepository.isRecipeKeywordExist(keywordId, recipeId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, RECIPE_KEYWORD_EXIST)
    }
    const item = await recipeKeywordRepository.create()
    item.keywordId = keywordId
    item.recipeId = recipeId
    await recipeKeywordRepository.save(item)
    return item
  } else {
    const newKeyword = await keywordRepository.create()
    newKeyword.name = keywordName
    await keywordRepository.save(newKeyword)
    const keywordId = newKeyword.id
    if (keywordId && recipeId && await recipeKeywordRepository.isRecipeKeywordExist(keywordId, recipeId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, RECIPE_KEYWORD_EXIST)
    }
    const item = await recipeKeywordRepository.create()
    item.keywordId = keywordId
    item.recipeId = recipeId
    await recipeKeywordRepository.save(item)
    return item
  }
}

const getAll = async (payload: any) => {
  const { recipeId } = payload
  const recipeKeywordRepository = getCustomRepository(RecipeKeywordRepository)
  const items = await recipeKeywordRepository
    .createQueryBuilder('rk')
    .innerJoin(Keyword, 'k', 'k.id = rk.keywordId')
    .select('rk.id', 'id')
    .addSelect('k.name', 'name')
    .where('rk.recipeId = :recipeId', { recipeId })
    .orderBy('k.name', 'ASC')
    .getRawMany()
  return items
}

const deleteRecipeKeyword = async (id: any) => {
  const recipeKeywordRepository = getCustomRepository(RecipeKeywordRepository)
  await recipeKeywordRepository.delete(id)
}

const add = async (recipeId: any, keyword: any) => {
  const keywordRepository = getCustomRepository(KeywordRepository)
  const recipeKeywordRepository = getCustomRepository(RecipeKeywordRepository)
  const keywordEntity = await keywordRepository.findOne({ name: keyword })
  if (keywordEntity) {
    const keywordId = keywordEntity.id
    if (!await recipeKeywordRepository.isRecipeKeywordExist(keywordId, recipeId)) {
      const newRecipeKeywordEntity = await recipeKeywordRepository.create()
      newRecipeKeywordEntity.keywordId = keywordId
      newRecipeKeywordEntity.recipeId = recipeId
      await recipeKeywordRepository.save(newRecipeKeywordEntity)
    }
  } else {
    const newKeyword = await keywordRepository.create()
    newKeyword.name = keyword
    await keywordRepository.save(newKeyword)
    const newKeywordId = newKeyword.id
    if (!await recipeKeywordRepository.isRecipeKeywordExist(newKeywordId, recipeId)) {
      const newRecipeKeywordEntity = await recipeKeywordRepository.create()
      newRecipeKeywordEntity.keywordId = newKeywordId
      newRecipeKeywordEntity.recipeId = recipeId
      await recipeKeywordRepository.save(newRecipeKeywordEntity)
    }
  }
}

const removeRecipeKeyword = async (recipeId: any, keyword: any) => {
  const keywordRepository = getCustomRepository(KeywordRepository)
  const recipeKeywordRepository = getCustomRepository(RecipeKeywordRepository)
  const keywordEntity = await keywordRepository.findOne({ name: keyword })
  if (keywordEntity) {
    const keywordId = keywordEntity.id
    await recipeKeywordRepository.delete({ recipeId, keywordId })
  }
}

const recipeKeywordService = {
  insert,
  getAll,
  deleteRecipeKeyword,
  add,
  removeRecipeKeyword
}

export default recipeKeywordService

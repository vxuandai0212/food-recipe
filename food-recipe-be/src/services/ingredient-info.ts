import { getCustomRepository, In } from 'typeorm'
import {
  IngredientInfoRepository
} from 'repositories/index'

const insert = async (payload: any) => {
  const ingredientInfoRepository = getCustomRepository(IngredientInfoRepository)
  let ingredientInfo: any = await ingredientInfoRepository.create()
  ingredientInfo = Object.assign({}, payload)
  await ingredientInfoRepository.save(ingredientInfo)
  return ingredientInfo
}

const update = async (payload: any) => {
  const { id } = payload
  const ingredientInfoRepository = getCustomRepository(IngredientInfoRepository)
  const ingredientInfo = await ingredientInfoRepository.findOneOrFail(id)
  Object.assign(ingredientInfo, payload)
  await ingredientInfoRepository.save(ingredientInfo)
  return ingredientInfo
}

const getAll = async (payload: any) => {
  const { ingredientId, types } = payload
  const ingredientInfoRepository = getCustomRepository(IngredientInfoRepository)
  return await ingredientInfoRepository.find({ where: { ingredientId, type: In(types) } })
}

const deleteIngredientInfo = async (id: any) => {
  const ingredientInfoRepository = getCustomRepository(IngredientInfoRepository)
  await ingredientInfoRepository.delete(id)
}

const ingredientInfoService = {
  getAll,
  insert,
  update,
  deleteIngredientInfo
}

export default ingredientInfoService

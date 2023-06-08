import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import service from 'services/ingredient-info'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_INGREDIENT_INFO_SUCCESS } from 'constants/message'

const upsert = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const id = payload.id
  if (!id) {
    const ingredientNutrition = await service.insert(payload)
    res.status(httpStatus.CREATED).send(successContentReponse(ingredientNutrition))
  } else {
    const ingredientNutrition = await service.update(payload)
    res.status(httpStatus.OK).send(successContentReponse(ingredientNutrition))
  }
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await service.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteIngredientInfo = catchAsync(async (req: any, res: any) => {
  await service.deleteIngredientInfo(req.body.id)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_INGREDIENT_INFO_SUCCESS))
})

const ingredientNutritionController = {
  upsert,
  getAll,
  deleteIngredientInfo
}

export default ingredientNutritionController

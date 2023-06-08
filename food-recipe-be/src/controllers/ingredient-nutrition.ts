import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import ingredientNutritionService from 'services/ingredient-nutrition'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_COOK_METHOD_SUCCESS } from 'constants/message'

const upsert = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const id = payload.id
  if (!id) {
    const ingredientNutrition = await ingredientNutritionService.insert(payload)
    res.status(httpStatus.CREATED).send(successContentReponse(ingredientNutrition))
  } else {
    const ingredientNutrition = await ingredientNutritionService.update(payload)
    res.status(httpStatus.OK).send(successContentReponse(ingredientNutrition))
  }
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await ingredientNutritionService.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteIngredientNutrition = catchAsync(async (req: any, res: any) => {
  await ingredientNutritionService.deleteIngredientNutrition(req.body.id)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_COOK_METHOD_SUCCESS))
})

const ingredientNutritionController = {
  upsert,
  getAll,
  deleteIngredientNutrition
}

export default ingredientNutritionController

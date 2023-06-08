import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import recipeIngredientService from 'services/recipe-ingredient'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_RECIPE_INGREDIENT_SUCCESS } from 'constants/message'

const upsert = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const id = payload.id
  if (!id) {
    const recipeIngredient = await recipeIngredientService.insert(payload)
    res.status(httpStatus.CREATED).send(successContentReponse(recipeIngredient))
  } else {
    const recipeIngredient = await recipeIngredientService.update(payload)
    res.status(httpStatus.CREATED).send(successContentReponse(recipeIngredient))
  }
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await recipeIngredientService.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteRecipeIngredient = catchAsync(async (req: any, res: any) => {
  await recipeIngredientService.deleteRecipeIngredient(req.body.id)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_RECIPE_INGREDIENT_SUCCESS))
})

const recipeIngredientController = {
  upsert,
  getAll,
  deleteRecipeIngredient
}

export default recipeIngredientController

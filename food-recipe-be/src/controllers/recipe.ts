import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import recipeService from 'services/recipe'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_RECIPE_SUCCESS } from 'constants/message'

const upsert = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const id = payload.id
  if (!id) {
    const recipe = await recipeService.insert(payload)
    res.status(httpStatus.CREATED).send(successContentReponse(recipe))
  } else {
    const recipe = await recipeService.update(payload)
    res.status(httpStatus.OK).send(successContentReponse(recipe))
  }
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await recipeService.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const get = catchAsync(async (req: any, res: any) => {
  const data = await recipeService.get(req.body.id)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteRecipe = catchAsync(async (req: any, res: any) => {
  await recipeService.deleteRecipe(req.body.id)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_RECIPE_SUCCESS))
})

const recipeController = {
  upsert,
  getAll,
  get,
  deleteRecipe
}

export default recipeController

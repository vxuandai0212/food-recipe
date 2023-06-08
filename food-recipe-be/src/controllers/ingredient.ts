import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import ingredientService from 'services/ingredient'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_INGREDIENT_SUCCESS } from 'constants/message'

const upsert = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const id = payload.id
  if (!id) {
    const ingredient = await ingredientService.insert(payload)
    res.status(httpStatus.CREATED).send(successContentReponse(ingredient))
  } else {
    const ingredient = await ingredientService.update(payload)
    res.status(httpStatus.OK).send(successContentReponse(ingredient))
  }
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await ingredientService.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const get = catchAsync(async (req: any, res: any) => {
  const data = await ingredientService.get(req.body.id)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteIngredient = catchAsync(async (req: any, res: any) => {
  await ingredientService.deleteIngredient(req.body.id)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_INGREDIENT_SUCCESS))
})

const ingredientController = {
  upsert,
  getAll,
  get,
  deleteIngredient
}

export default ingredientController

import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import nutritionService from 'services/nutrition'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_NUTRITION_SUCCESS } from 'constants/message'

const upsert = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const id = payload.id
  if (!id) {
    const nutrition = await nutritionService.insert(payload)
    res.status(httpStatus.CREATED).send(successContentReponse(nutrition))
  } else {
    const nutrition = await nutritionService.update(payload)
    res.status(httpStatus.OK).send(successContentReponse(nutrition))
  }
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await nutritionService.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteNutrition = catchAsync(async (req: any, res: any) => {
  const ids = req.body.ids
  await nutritionService.deleteNutrition(ids)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_NUTRITION_SUCCESS))
})

const nutritionController = {
  upsert,
  getAll,
  deleteNutrition
}

export default nutritionController

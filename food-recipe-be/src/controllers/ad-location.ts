import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import service from 'services/ad-location'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_RECIPE_KEYWORD_SUCCESS } from 'constants/message'

const insert = catchAsync(async (req: any, res: any) => {
  const item = await service.insert(req.body)
  res.status(httpStatus.OK).send(successContentReponse(item))
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await service.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteAdLocation = catchAsync(async (req: any, res: any) => {
  await service.deleteAdLocation(req.body.id)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_RECIPE_KEYWORD_SUCCESS))
})

const adLocationController = {
  insert,
  getAll,
  deleteAdLocation
}

export default adLocationController

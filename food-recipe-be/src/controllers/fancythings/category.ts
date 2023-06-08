import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import service from 'services/fancythings/category'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_FT_CATEGORY_SUCCESS } from 'constants/message'

const upsert = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const id = payload.id
  if (!id) {
    const ad = await service.insert(payload)
    res.status(httpStatus.CREATED).send(successContentReponse(ad))
  } else {
    const ad = await service.update(payload)
    res.status(httpStatus.OK).send(successContentReponse(ad))
  }
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await service.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const getActive = catchAsync(async (req: any, res: any) => {
  const data = await service.getActive()
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteCategory = catchAsync(async (req: any, res: any) => {
  await service.deleteCategory(req.body.id)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_FT_CATEGORY_SUCCESS))
})

const controller = {
  upsert,
  getAll,
  getActive,
  deleteCategory
}

export default controller

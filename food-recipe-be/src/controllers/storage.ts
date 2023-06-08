import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import storageService from 'services/storage'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_STORAGE_SUCCESS } from 'constants/message'

const upsert = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const id = payload.id
  if (!id) {
    const storage = await storageService.insert(payload)
    res.status(httpStatus.CREATED).send(successContentReponse(storage))
  } else {
    const storage = await storageService.update(payload)
    res.status(httpStatus.OK).send(successContentReponse(storage))
  }
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await storageService.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteStorage = catchAsync(async (req: any, res: any) => {
  const ids = req.body.ids
  await storageService.deleteStorage(ids)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_STORAGE_SUCCESS))
})

const storageController = {
  upsert,
  getAll,
  deleteStorage
}

export default storageController

import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import service from 'services/ad-customer'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_AD_CUSTOMER_SUCCESS } from 'constants/message'

const upsert = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const { id } = payload
  if (!id) {
    const item = await service.insert(payload)
    res.status(httpStatus.CREATED).send(successContentReponse(item))
  } else {
    const item = await service.update(payload)
    res.status(httpStatus.OK).send(successContentReponse(item))
  }
})

const get = catchAsync(async (req: any, res: any) => {
  const data = await service.get(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await service.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteAdCustomer = catchAsync(async (req: any, res: any) => {
  const { id } = req.body
  await service.deleteAdCustomer(id)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_AD_CUSTOMER_SUCCESS))
})

const adCustomerController = {
  upsert,
  get,
  getAll,
  deleteAdCustomer
}

export default adCustomerController

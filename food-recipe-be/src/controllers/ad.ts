import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import adService from 'services/ad'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { DELETE_AD_SUCCESS } from 'constants/message'

const upsert = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const id = payload.id
  if (!id) {
    const ad = await adService.insert(payload)
    res.status(httpStatus.CREATED).send(successContentReponse(ad))
  } else {
    const ad = await adService.update(payload)
    res.status(httpStatus.OK).send(successContentReponse(ad))
  }
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await adService.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const get = catchAsync(async (req: any, res: any) => {
  const data = await adService.get(req.body.id)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const deleteAd = catchAsync(async (req: any, res: any) => {
  await adService.deleteAd(req.body.id)
  res.status(httpStatus.OK).send(successSimpleResponse(DELETE_AD_SUCCESS))
})

const adView = catchAsync(async (req: any, res: any) => {
  const data = await adService.adView(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const adViewGet = catchAsync(async (req: any, res: any) => {
  const data = await adService.adViewGet(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const adViewLog = catchAsync(async (req: any, res: any) => {
  const data = await adService.adViewLog(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const adController = {
  upsert,
  get,
  getAll,
  deleteAd,
  adView,
  adViewGet,
  adViewLog
}

export default adController

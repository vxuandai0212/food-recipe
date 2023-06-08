import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import { viewService, adViewService } from 'services/index'
import { successContentReponse } from 'utils/common'

const recipe = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const view = await viewService.recipe(payload)
  res.status(httpStatus.CREATED).send(successContentReponse(view))
})

const keyword = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const view = await viewService.keyword(payload)
  res.status(httpStatus.CREATED).send(successContentReponse(view))
})

const nativeAd = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const view = await adViewService.nativeAd(payload)
  res.status(httpStatus.CREATED).send(successContentReponse(view))
})

const admob = catchAsync(async (req: any, res: any) => {
  const payload = req.body
  const view = await adViewService.admob(payload)
  res.status(httpStatus.CREATED).send(successContentReponse(view))
})

const viewController = {
  recipe,
  keyword,
  nativeAd,
  admob
}

export default viewController

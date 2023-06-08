import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import mobileService from 'services/mobile'
import { successContentReponse, successSimpleResponse } from 'utils/common'
import { AD_VIEW_SUCCESS } from 'constants/message'
import { redisClient, ENABLE_REDIS, REDIS_TTL } from 'config/redis'

const recent = catchAsync(async (req: any, res: any) => {
  if (ENABLE_REDIS) {
    const redisKey = `apis/recipes/recent:${JSON.stringify(req.body)}`
    if (await redisClient.exists(redisKey)) {
      const result: any = await redisClient.get(redisKey)
      res.status(httpStatus.OK).send(JSON.parse(result))
    } else {
      const data = await mobileService.recent(req.body)
      const redisValue = JSON.stringify(data)
      redisClient.set(redisKey, redisValue)
      redisClient.expire(redisKey, REDIS_TTL)
      res.status(httpStatus.OK).send(successContentReponse(data))
    }
  } else {
    const data = await mobileService.recent(req.body)
    res.status(httpStatus.OK).send(successContentReponse(data))
  }
})

const search = catchAsync(async (req: any, res: any) => {
  const data = await mobileService.search(req)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const recipeGet = catchAsync(async (req: any, res: any) => {
  const data = await mobileService.recipeGet(req)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const adView = catchAsync(async (req: any, res: any) => {
  await mobileService.adView(req)
  res.status(httpStatus.OK).send(successSimpleResponse(AD_VIEW_SUCCESS))
})

const controller = {
  recent,
  search,
  recipeGet,
  adView
}

export default controller

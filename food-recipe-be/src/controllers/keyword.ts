import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import keywordService from 'services/keyword'
import { successContentReponse } from 'utils/common'

const insert = catchAsync(async (req: any, res: any) => {
  const ad = await keywordService.insert(req.body)
  res.status(httpStatus.OK).send(successContentReponse(ad))
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await keywordService.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const keywordController = {
  insert,
  getAll
}

export default keywordController

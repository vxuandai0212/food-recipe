import httpStatus from 'http-status'
import { catchAsync } from 'utils/index'
import service from 'services/fancythings'
import { successContentReponse } from 'utils/common'

const get = catchAsync(async (req: any, res: any) => {
  const data = await service.get(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const getAll = catchAsync(async (req: any, res: any) => {
  const data = await service.getAll(req.body)
  res.status(httpStatus.OK).send(successContentReponse(data))
})

const controller = {
  get,
  getAll
}

export default controller
